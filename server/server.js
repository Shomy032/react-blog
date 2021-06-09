const express = require("express");
const app = express();
app.use(express.json());

const db = require("monk")("localhost:27017/blog");
const blogs = db.get("blog-posts");

const morgan = require("morgan");
app.use(morgan("tiny"));

require("dotenv").config();
const PORT = process.env.PORT || "4002"; // 4002 in dev

const cors = require("cors");

app.listen(PORT, () => {
  console.log(`i am listening on localhost:${PORT}`);
});

app.get(
  "/blogs/:id",
  cors({ origin: "http://localhost:3000" }) /*for now*/,
  async (req, res, next) => {
    try {
      const data = await blogs.findOne({ name: req.params.id });
      // console.log(data)
      if (!data) throw new Error("that post is not in database");
      res.json({ ...data });
    } catch (err) {
      res.json({ message: err.message, success: false });
    }
  }
);

app.get(
  "/blogs",
  cors({ origin: "http://localhost:3000" }) /*for now*/,
  async (req, res, next) => {
    try {
      const data = await blogs.find({});
      // console.log(data)
      if (!data) throw new Error("there is no posts in db");
      res.json(data);
    } catch (err) {
      res.json({ message: err.message, success: false });
    }
  }
);

const authRoutes = require("./auth_router");
app.use("/auth", authRoutes);

//ALL ROUTES THAT NEED VALIDATION E.G. COMMENT , REPLY , EDIT ...
const actionRoutes = require("./action_router"); // actionRoutes = {router , method1 , method2}
app.use("/action", actionRoutes.router); // fix it

// todo mome this to module
const posts = db.get("posts");
app.get(
  "/posts/all",
  cors({ origin: "http://localhost:3000" }),
  async (req, res, next) => {
    const all = await posts.find({});
    const sorted = all.sort((a, b) => b.likes - a.likes);
    res.status(200).json(sorted);
  }
);

// maybe not
// TODO MAKE ENDPONT SORT ALL BY MOST RECENT
// app.get('/posts/all/recent', cors({origin : "http://localhost:3000"}) , async (req , res , next) =>{
//   const all = await posts.find({})
//   const  sorted = all.sort((a , b) =>  b.likes - a.likes )
//   res.status(200).json(sorted)
// })

// todo : enable searching by partial , now you need full name
app.get(
  "/posts/:query",
  cors({ origin: "http://localhost:3000" }),
  async (req, res) => {
    // search and return one or more or throw Error
    try {
      if (req.params.query == "id") { // check if query is id , if it is just send the one
        console.log(req.query._id , 'req.queru :::')
        const one = await posts.find({ _id: req.query._id });
        if (one.length !== 0) {
          res.status(200).json(one);
        } else {
          throw new Error("there is no user with that id"); // this should never happen , but just in case
        }
      } else if (req.params.query == "search") { // need to search for all words 1+2+3+...
        let allNames = []  
        let arr = req.query.name.split('+') // todo sanitaze input on client so it omit +
           arr.forEach((e) =>{ allNames.push(e) }) // query input , and push all in arr allNames

           let searchArr = []
           if(allNames.length !== 0 ){ // then construct search query , if there are parametars
            console.log(allNames)
               allNames.forEach((e) => {
                  searchArr.push({"name" : {$regex : `.*${e}.*`}}) 
                }) 
            } else{
              throw new Error('no search parametars')
            }

              // this return all close matches
         const all = await posts.aggregate([ {"$match": { $or: searchArr }}  ]); 
        
        // this 2 for loops are needed to determine wich search result is better , or closer
         for(let i = 0 ; i < all.length ; i++) {            // this regex is not matching CASE //FIX later
            let allRegex = allNames.map(e => new RegExp(`.*${e}.*`)) // allNames = variable form one closure up
              let weight = 0 // this is parametar for later sorting
    
              for(let j = 0 ; j < allRegex.length ; j++){ 
            //   console.log('testing' , allRegex[j] , 'vs' , all[i].name)
                  if(allRegex[j].test(all[i].name)) {
                //    console.log('test passed')
                    weight++
                  } else {console.log('test failed')}
          
               }
               all[i].weight = weight // append result to obj
        } 
         all.sort((a,b) =>  b.weight - a.weight ) // sort by most relevant search result

          res.status(200).json(all)  
      } else if (req.params.query == "filter") {
        // this is for filters
        const sorted = await posts.find({} , {fields : { tags : 1}} ); // get all
        // filter for all _id and tags , bcs i dont need other thinhs here
       
        const allFilters = req.query.tag; // get all filters form query string

        let filtered = [];
        if (Array.isArray(allFilters)) {
          // check if we have more then one parametar

          filtered = sorted.filter((element) => {
            // all this is needed bcs arr.includes() is retarded
            let result = [];
            for (let i = 0; i < allFilters.length; i++) {
              result.push(element.tags.includes(allFilters[i]));
            }

            return result.every((e) => e == true);
          });
        } else {
          // is we have single filter
          filtered = sorted.filter((e) => e.tags.includes(allFilters));
        }

        const match = []; // now find all elements that passes test, and push them in match
        for (let i = 0; i < filtered.length; i++) {
          const one = await posts.findOne({ _id: filtered[i]._id }); // maybe remove foor loop if perofrmance is droping , and remove fields so there is no need for 2nd query

          if (Object.keys(one).length !== 0) {
            match.push(one);
          }
        }
        // if we have any matches send them , otherwise throw Error
        if (match.length !== 0) {
          res.status(200).json(match);
        } else {
          throw new Error("there is no posts with that tags");
        }
      } else {
        // this is if req.params.query isnt id or search or filter
        throw new Error("query params arent valid");
      }
    } catch (err) {
      // this will catch errors for all 3 things
      res.status(404).json({ massage: err.message });
    }

    // if(one.length === 0){res.sendStatus(404)}
    // else { res.status(200).json(one)}
  }
);

// obj[Object.keys(obj)[0]] // cool trick to get first thing in obj



// "$add": { "$cond": {
//   "if": { "$eq": [ "$name", "question about sql" ] }, // this work :) // bcs is full match
//   "then": 1,
//   "else": 0
// }}




  //  { "$cond": {
        //   "if": { "$eq": [ "$name", "question about sql" ] }, // this work :) // bcs is full match
        //   "then": 1,
        //   "else": 0
        // }}
        // { "$project": {                 
        //   "name": 1,                          
        //   "author" : 1,  
        //    "text" : 1 ,
        //     "likes" : 1 ,
        //     "date" : 1,
        //     "tags" : 1 ,
        //   "weight": {  // add wight ++1 for all matches we have so we can sort
        //     "$add": [ 
        //       { "$cond": {
        //         "if": {  $regexMatch: { input : 'name' , regex: `.*${'recat'}.*`, options: 'i' } },
        //         "then": 1,
        //         "else": 0
        //       }}
        //     ] 
        //   }
        // }},


                   

          // const str = 'table football';

          // const regex = new RegExp('foo*');
          // const globalRegex = new RegExp('foo*', 'g');
          
          // console.log(regex.test(str));