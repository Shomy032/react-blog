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
      } else if (req.params.query == "search") { //TODO
        // handle search //TODO handle if user want to search
      } else if (req.params.query == "filter") {
        // this is for filters
        const all = await posts.find({}); // get all
        // filter for all _id and tags , bcs i dont need other thinhs here
        const sorted = all.map((e) => {
          return { _id: e._id, tags: e.tags };
        });
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
          const one = await posts.findOne({ _id: filtered[i]._id });

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

// app.get('/posts/:queryString' ,async (req , res) =>{
//   console.log(req.params , req.query)
//   let search = req.params.query.split('=')[1]
//   console.log(search)
//   res.send(search)
// })

// obj[Object.keys(obj)[0]] // cool trick to get first thing in obj
