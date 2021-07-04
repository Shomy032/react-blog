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


router.post('/isThereUser' , (req , res , next) => {
  console.log("...validating cookie...")
  next()
} , validateJwt )

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
const { resetCode , verifyEmail } = require("./config") // db connection , its used also in next route
const { errorHandler } = require('./errHandler')
const { resetEmailSchema } = require('./schemas')
router.post("/resetemail" , async (req , res , next) => {
    console.log(req.body)
   try{
      const valid = await ajv.validate( resetEmailSchema , req.body )
      if(valid){
const myRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
         
            if(myRegex.test(req.body.email)){

            const userMailCheck = await users.find({email : req.body.email})   
            console.log("userMail" , userMailCheck) 
              if(userMailCheck.length !== 0){
                const { MailSender } = require("./Classes")
                // send verification email here , and store in db , my internet is dead soo i cant do it now

                  function makeCode(){
                    let code = ""
                    
                      for(let i = 0 ; i < 6 ; i++){
                        let verificationCodeMaker = Math.floor(Math.random() * 9)
                        code += verificationCodeMaker.toString()
                      }
                    return code ;
                  }

                  let codeToSend = makeCode() ;

                const mail =  new MailSender(req.body.email , "Hello , this is password reset email" , `your verification code : ${codeToSend}` ).sendMail() 
                const adding = await resetCode.insert({ email : req.body.email , code : codeToSend , exp : Math.floor(Date.now() / 1000) })
                console.log(adding ,  "adding")
          
                res.status(200).json({
                  success : true 
                })
              } else {
              throw new Error("there is no user with that email")
              }
        
          } else {
            throw new Error("pls enter valid email")  
          }
      } else {
        throw new Error("invalid schema")
      }

   } catch(err) {
     console.log(err)
     next(err)
   }

} , errorHandler )


const { resetEmailCode } = require("./schemas")
router.post("/resetcode" , async(req , res , next) => {

  try {
      const valid = await ajv.validate(resetEmailCode , req.body)
      if(valid){
          if(req.body.code.length === 6){
      
             const match = await resetCode.find({email : req.body.email , code : req.body.code})
             console.log(match , "match")

              if(match.length == 0){ // there is 10 min to verify email
                const cleanUp2 = await resetCode.remove({email : req.body.email , code : req.body.code} , {justOne : true}) 
                console.log('cleanUp2' , cleanUp2)
                 throw new Error("there is no code like that")
            } else if((match.exp - Math.floor(Date.now / 1000)) > 600) { 
              const cleanUp1 = await resetCode.remove({email : req.body.email , code : req.body.code} , {justOne : true}) 
              throw new Error("code is expired , pls try again ( 10min )")
            } else {
              res.status(200).json({
                success : true , 
                message : "verification is successfull" 
              })
              const cleanUp1 = await resetCode.remove({email : req.body.email , code : req.body.code} , {justOne : true}) 
             // console.log("cleanUp" , cleanUp1)
            }

          }else {
            throw new Error("code is not 6 diget long , exiting")  
          }
      }else {
        throw new Error("schema is invalid")
      }


  } catch(err){
    next(err)
  }

} , errorHandler )

// here add reset password route

router.post(
  "/register",
  async (req, res) => {
   // console.log(req)

  //  console.log(req.headers, req.body, req.params, req.query);
    try {
      const valid = await ajv.validate(schemaRegister, req.body);

      if (valid) {
        const checkEmail = await users.find({ email: req.body.email });
        const checkUsername = await users.find({
          username: req.body.username
        });

          if(checkEmail.length !== 0){
              throw new Error("sorry , that email is in use")
          } else if (checkUsername.length !== 0) {
              throw new Error("sorry , that username is in use")
          } else if(checkEmail.length == 0 && checkUsername.length == 0) {
              if(req.body.password1 !== req.body.password2){
                throw new Error("passwords are not the same")
              }
            // todo : add here check for email verification
            const { MailSender } = require("./Classes")
            // send verification email here , and store in db , my internet is dead soo i cant do it now
  
              function makeCode(){
                let code = ""
                
                  for(let i = 0 ; i < 6 ; i++){
                    let verificationCodeMaker = Math.floor(Math.random() * 9)
                    code += verificationCodeMaker.toString()
                  }
                return code ;
              }
  
              let codeToSend = makeCode() ;
                const user = {
                username : req.body.username ,
                email : req.body.email ,
                password : req.body.password1
              }
  
            const mail =  new MailSender(req.body.email , "Hello , this is verification email" , `your verification code : ${codeToSend}` ).sendMail() 
            const adding = await verifyEmail.insert({ email : req.body.email , code : codeToSend , exp : Math.floor(Date.now() / 1000) , user : user })
           // console.log(adding ,  "adding")
      
            res.status(200).json({
              success : true ,
              message : `verification email is send to ${req.body.email}`,
              username : req.body.username
            })
          } else {
            throw new Error("there is an error");
          }

          
// maybe check for length not like this
        
         
        
      }
      else {
        res
          .status(400)
          .json({ message: "invalid register schema", success: false });
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: err.message || "there is an error", success: false });
    }
  }
);


const { schemaVerifyRegister } = require("./schemas")
router.post("/verifyregister" , async (req , res , next ) => {
  try{
    const valid = await ajv.validate(schemaVerifyRegister  , req.body)
    if(valid){
      if(req.body.code.length === 6){
      
        const match = await verifyEmail.find({email : req.body.email , code : req.body.code})
      //  console.log(match , "match")
          console.log(match[0] , "match")

         if(match.length == 0){ // there is 10 min to verify email
           const cleanUp2 = await  verifyEmail.remove({email : req.body.email , code : req.body.code} , {justOne : true}) 
           console.log('cleanUp2' , cleanUp2)
            throw new Error("there is no code like that")
       } else if((match[0].exp - Math.floor(Date.now / 1000)) > 600) { 
         const cleanUp1 = await  verifyEmail.remove({email : req.body.email , code : req.body.code} , {justOne : true}) 
         throw new Error("code is expired , pls try again ( 10min )")
       } else {



        bcrypt.hash(match[0].user.password , 10, async function (err, hash) {
          if (err) {
            throw new Error("problem with hash");
          } // just dev thing , remove in production
            let userToAdd = match[0].user ;
            userToAdd.password = hash ;
          //insert user to db
          await users.insert(userToAdd);
          // search again for his _id
          const data = await users.findOne({ email: req.body.email });
          const token = sighJWT(data);
         
          res.cookie("access_token", token  ,{ httpOnly: true });
          res
            .status(200)
            .json({
              message: "you are registred",
              success: true,
              username: req.body.username,
            });
        });


        
         res.status(200).json({
           success : true , 
           message : "verification is successfull"
         })
         const cleanUp1 = await  verifyEmail.remove({email : req.body.email , code : req.body.code} , {justOne : true}) 
        // console.log("cleanUp" , cleanUp1)
       }

     }else {
       throw new Error("code is not 6 diget long , exiting")  
     }
    }  else {
      throw new Error("schema is invalid")
    }

  } catch(err){
    next(err)
  }

} , errorHandler )









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

 function validateJwt(req, res) {
  try {
    const superSecret = process.env.SECRET;

    const ber = req.headers.cookie.split("=")[1]; // parse auth headers , to get token
    const decoded = jwt.verify(ber, superSecret);

    //  console.log("decoded", decoded);

    if (decoded) {
      res.locals.user = decoded.data[0]; // data = [username , email , id]
      res.locals.email = decoded.data[1]; // passing to next middleware
      res.locals._id = decoded.data[2];

      res.locals.authenticated = true; // maybe not needed

      res.status(200).json({
        success : true , 
        message : "we have user , token is good" ,
        data : {
          ...res.locals
        }
      });
    }
  } catch (err) {
    // redirect here , maybe

    res.status(403).json({
      message: err.message, // remove message in production
      messageProduction: "invalid token",
      success: false,
      redirect: true, // redirecto to login popup
    });
  }
}





module.exports = router;
