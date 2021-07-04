const { getNodeText } = require("@testing-library/react");
const express = require("express");
const router = express.Router();


const { posts , comment } = require('./config') // get db collections
const { errorHandler  } = require('./errHandler');


router.get(
  "/all",
  async (req, res) => {
    const all = await posts.find({}); // 2
    const sorted = all.sort((a, b) => b.likes - a.likes);
    res.status(200).json(sorted);
  }
);

const { getComments , ajv} = require("./schemas")
router.post('/comments' , async (req , res , next) => {
  
  try {
  //  console.log(getComments , req.body ,"2")
    const validate = ajv.validate( getComments , req.body );
    if(validate){
    const { postId } = req.body ; 
      //allCommentsIdArray 
    const getArrayOfComments = await posts.find({ _id : postId} , {comments : 1 , _id : 0}) ;

if(getArrayOfComments.length == 0){
throw new Error("there is no comments on this post")
}
  //console.log("getArrayOfComments" , getArrayOfComments)
   const get = await comment.find({ _id : { $in : getArrayOfComments[0].comments }  , commentedOn : postId })
       
// console.log("get ::" , get)
 if( get.length == 0){
  throw new Error("there is no comments here");
 }else {
  res.status(200).json(get);
 }



    }else{
      throw new Error("invalid schema")
    }
   
  }catch(err){
    next(err)
  }
    
} , errorHandler );




router.get("/:query", async (req, res) => {
  // search and return one or more or throw Error
  try {
    if (req.params.query == "id") {
      // check if query is id , if it is just send the one
      //  console.log(req.query._id , 'req.queru :::')
      const one = await posts.find({ _id: req.query._id }); // 2
      if (one.length !== 0) {
        res.status(200).json(one);
      } else {
        throw new Error("there is no user with that id"); // this should never happen , but just in case
      }
    } else if (req.params.query == "search") {
      // need to search for all words 1+2+3+...

      let allNames = [];
      if (req.query.name) {
        let arr = req.query.name.split("+"); // todo sanitaze input on client so it omit +
        arr.forEach((e) => {
          allNames.push(e);
        }); // query input , and push all in arr allNames
      } else {
        throw new Error("you need to search by name");
      }

      let searchArrName = [];
      let searchArrText = [];
      if (allNames.length !== 0) {
        // then construct search query , if there are parametars

        allNames.forEach((e) => {
          searchArrName.push({ name: { $regex: `.*${e}.*`, $options: "i" } });
          searchArrText.push({ text: { $regex: `.*${e}.*`, $options: "i" } });
        });
      } else {
        throw new Error("no search parametars");
      }

      // this return all close matches , searched by name or text
      const all = await posts.aggregate([
        { $match: { $or: [{ $or: searchArrName }, { $or: searchArrText }] } },
      ]); // 2

      // this 2 for loops are needed to determine wich search result is better , or closer
      for (let i = 0; i < all.length; i++) {
        // this regex is not matching CASE //FIX later
        let allRegex = allNames.map((e) => new RegExp(`.*${e}.*`, "i")); // allNames = variable form one closure up
        let weight = 0; // this is parametar for later sorting

        for (let j = 0; j < allRegex.length; j++) {
          //   console.log('testing' , allRegex[j] , 'vs' , all[i].name)

          //  todo : add more cases , currently it run only tests , maybe count matches
          if (allRegex[j].test(all[i].text.split(" ").join(""))) {
            weight += 0.34;
          } // if there is match in text
          if (allRegex[j].test(all[i].name.split(" ").join(""))) {
            weight += 1;
          } // or if there is match in name
        }
        all[i].weight = weight; // append result to obj
      }
      if (all.length == 0) {
        throw new Error("no results");
      }
      all.sort((a, b) => b.weight - a.weight); // sort by most relevant search result
      res.status(200).json(all);
    } else if (req.params.query == "filter") {
      // this is for filters
      const sorted = await posts.find({}, { fields: { tags: 1 } }); // get all  /// 2
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
        // 2
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
    // this will catch errors for all 3 things , and send it
    res.status(404).json({ massage: err.message, success: false }); // dev
  }
});





module.exports = {
  postRouter: router,
};
