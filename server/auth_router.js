const express = require("express");
const router = express.Router();

const cors = require("cors");
// const db = require("monk")("localhost:27017/blog");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// log time and where request is comeing from
// this is not needed remove if you want
router.use(cors({ origin: "http://localhost:3000" }) , (req, res, next) => {
  console.log("Time: ", Date.now(), "from auth router");
  next();
});


const { posts , blogs , users } = require('./config') // get db collections
const { schemaRegister ,  schema , ajv} = require('./schemas')



// router.options("/register", function (req, res) {
//   res.set("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.set("Access-Control-Allow-Methods", "POST");
//   res.set("Access-Control-Allow-Headers", "*");
//   res.status(204).send() ; //remove send in development
// });

// router.options("/login" , function (req, res){
//   // console.log(req)
 
//    res.append("Access-Control-Allow-Credentials" ,  true)
//    res.append("Access-Control-Allow-Headers", "*");
  
//    console.dir()
//   // console.log(res)
//    res.status(204).end()
 
//    console.dir(res.headersSent) 
//  })
 
// router.options("/login" , (req , res , next) =>{

// console.log('router use :::')

//   res.append("Access-Control-Expose-Headers", "ETag");
//   res.append('Access-Control-Allow-Methods', 'GET, POST');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');

// console.log( "response from router.use ::: " , res )

//   res.sendStatus(203);
// })




router.post(
  "/register",
  async (req, res) => {
    console.log(req)

    console.log(req.headers, req.body, req.params, req.query);
    try {
      const valid = await ajv.validate(schemaRegister, req.body);

      if (valid) {
        const checkEmail = await users.findOne({ email: req.body.email });
        const checkUsername = await users.findOne({
          username: req.body.username,
        });



        if (!checkEmail && !checkUsername) {

          // todo : add here check for email verification

          bcrypt.hash(req.body.password, 10, async function (err, hash) {
            if (err) {
              throw new Error("problem with hash");
            } // just dev thing , remove in production

            req.body.password = hash;

            //insert user to db
            await users.insert(req.body);
            // search again for his _id
            const data = await users.findOne({ email: req.body.email });
            const token = sighJWT(data);
            // console.log(data , token)
            res.cookie("access_token", token  ,{ httpOnly: true });
            res
              .status(200)
              .json({
                message: "you are registred",
                success: true,
                username: req.body.username,
              });
          });
        } else {
          throw new Error("email or username is in use");
        }
      }
      if (!valid) {
        res
          .status(400)
          .json({ message: "invalid register schema", success: false });
      }
    } catch (err) {
      res.status(400).json({ message: err.message, success: false });
    }
  }
);



router.post(
    "/login",
    

    async (req, res) => {
      console.log(req)
      // todo : remove validating jwt
      try {
        // console.log(req.body)
       // console.log(schema , req.body)
        const valid = await ajv.validate(schema, req.body);
      //  console.log(valid , 'valid')
        // console.log('valid' ,  valid)
        if (valid) {
          // 1. lvl deep
  
          const check = await users.findOne({ email: req.body.email });
          // console.log('data' , check)
  
          if (!check) { // maybe // check.length !== 0 ;
            throw new Error("there is no user with that email in db");
          }
          if (check) {
            // 2. 
            const match = await bcrypt.compare(req.body.password, check.password);
  
            // if we have match allow login if not throw err
            if (match) {

              const token = sighJWT(check);
              res.cookie("access_token", token  , { httpOnly: true });

              res
                .status(200)
                .json({
                  message: "login accepted",
                  success: true,
                  username: check.username,
                });
            } else {
              // 3. 
              // console.log('we have no match')
              throw new Error("invalid credentials");
            }
            if (!match) {
            }
          }
        } else if (!valid) {
           res
             .status(400)
             .json({ message: "invalid login schema", success: false });
         }
      } catch (err) {
        // console.log(err)
        res.status(400).json({ message: err.message, success: false });
      }
    }
  );
  

// pure function for singing jwt
const sighJWT = function signJwt(data) {
  try {
    const superSecret = process.env.SECRET ;

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 21, // expire time in seconds (60 * 60) = 1h
        data: [data.username, data.email, data._id], // hardcoded example
      },
      superSecret
    );

    return token;
  } catch (err) {
    console.log("there is err"); // remove later
  }
};

// all auth routes and middleware

module.exports = router;
