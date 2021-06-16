const express = require("express");
const router = express.Router();

const cors = require("cors");
// const db = require("monk")("localhost:27017/blog");
const Ajv = require("ajv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// log time and where request is comeing from
// this is not needed remove if you want
router.use( (req, res, next) => {
  console.log("Time: ",  new Date() , "from action router"  );
  next();
});

router.use(
 (req , res , next) =>{
   // console.log('...validating...') ; 
    next() // remove
  }, 
 validateJwt , // validate auth
(req, res, next) => {
//  console.log('token validation is passed') // remove
  next();
});



// TODO : comment , like/upvote , replay , edit , edit profile 
const { posts , users } = require('./config')
const { postSchema , ajv } = require('./schemas') // ajv is validator

router.post('/post' , async (req , res , next) => {

try{
  const valid = await ajv.validate(postSchema, req.body);  
  if(!valid) {
   //   console.log( valid )
     throw new Error('there is err with schema') 
    } 
  else {
  //  console.log( 'WE ARE IN ELSE BLOCK' )
// dont need to parse jwt here , its parsed in middleware and passed here in "locals"

let addTags = req.body.tags || [] //todo : valdate tags , soo user cant add tag asjkdasbhd from cmd

let post = {
  name : req.body.name ,
  text : req.body.text ,
  author :  res.locals._id , // added from jwt
  likes : 0 ,
  peopleLiked : [] ,
  date : new Date() , 
  tags: addTags , // todo add more validation here
  comments : []
}

const added = await posts.insert(post);

res.status(201).json({
  id : added._id , 
message : 'post is added' ,
success : true
})


  }

} catch(err){
//  console.log('there is err in catch blok' , err)
  next(err)
}

} ,  (err , req , res , next) => {
 // console.log('there is err in last middleware' , err)
  if(err){
    res.status(400).json({message : err.message , success : false })
  } else {
    res.sendStatus(500)
  }

  })



router.post('/comment' , (req , res , next) => {

})
router.post('/like' , (req , res , next) => {

})
router.post('/replay' , (req , res , next) => {

})


router.put('/edit' , (req , res , next) => {

})
router.put('/edit-profile' , (req , res , next) => {
// probably its to much
})

// used at all routes in this file
// middleware for validating jwt tokens
async function validateJwt(req, res, next) {

  try {
    const superSecret =  process.env.SECRET;

    const ber = req.headers.cookie.split("=")[1]; // parse auth headers , to get token
    const decoded = jwt.verify(ber, superSecret);

  //  console.log("decoded", decoded);

    if (decoded) {
      res.locals.user = decoded.data[0]; // data = [username , email , id]
      res.locals.email = decoded.data[1]; // passing to next middleware
      res.locals._id = decoded.data[2]; 

      res.locals.authenticated = true; // maybe not needed

      next();
    }
  } catch (err) {
    
    // redirect here , maybe

    res
      .status(403)  
      .json({
        message: err.message, // remove message in production
        messageProduction: "invalid token",
        success: false,
      });
  }
}

 

 module.exports = router  ;

// export default {
//   validateJwt  , 
//    router ,
//    basicSum ,
//    advancedSum
// } 


// module.exports = {
//   validateJwt  , 
//    router ,
//    basicSum
// } 