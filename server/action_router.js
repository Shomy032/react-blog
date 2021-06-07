const express = require("express");
const router = express.Router();

const cors = require("cors");
const db = require("monk")("localhost:27017/blog");
const Ajv = require("ajv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// log time and where request is comeing from
// this is not needed remove if you want
router.use(cors({ origin: "http://localhost:3000" }) , (req, res, next) => {
  console.log("Time: ", Date.now(), "from action router");
  next();
});

router.use(cors({ origin: "http://localhost:3000" }), // action is for all routes then need auth
 (req , res , next) =>{ console.log('...validating...') ; next() }, // remove
validateJwt , // validate auth
(req, res, next) => {
  console.log('token validation is passed') // remove
  next();
});

// TODO : comment , like/upvote , replay , edit , edit profile 
router.post('/comment' , (req , res , next) => {

})
router.post('/like' , (req , res , next) => {

})
router.post('/replay' , (req , res , next) => {

})


router.put('/edit' , (req , res , next) => {

})
router.put('/edit-profile' , (req , res , next) => {

})

// used at all routes in this file
// middleware for validating jwt tokens
async function validateJwt(req, res, next) {
  try {
    const superSecret =  process.env.SECRET;

    const ber = req.headers.cookie.split("=")[1]; // parse auth headers , to get token
    const decoded = jwt.verify(ber, superSecret);
    console.log("decoded", decoded);
    if (decoded) {
      res.locals.user = decoded.data[0]; // data = [username , email , id]
      res.locals.email = decoded.data[1]; // passing to next middleware
      res.locals.authenticated = true;

      next();
    }
  } catch (err) {
    
    res
      .status(403)
      .json({
        message: err.message, // remove message in production
        messageProduction: "invalid token",
        success: false,
      });
  }
}


module.exports = router;