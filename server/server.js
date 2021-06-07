const express = require('express');
const app = express();
app.use(express.json())

const db = require('monk')('localhost:27017/blog')
const blogs = db.get('blog-posts')

const morgan = require('morgan')
app.use(morgan('tiny'))

require('dotenv').config()
const PORT = process.env.PORT || '4002';

const cors = require('cors')



app.listen(PORT , () => {
  console.log(`i am listening on localhost:${PORT}`)
})



app.get('/blogs/:id' , cors({origin : "http://localhost:3000"}) /*for now*/,  async (req , res , next) => {
  try{
    const data = await blogs.findOne({name : req.params.id})
    // console.log(data)
    if(!data) throw new Error('that post is not in database')
    res.json(
     {...data}
    )
  }
 catch(err){
   res.json({message : err.message , success : false})
 }
 
})

app.get('/blogs' , cors({origin : "http://localhost:3000"}) /*for now*/,  async (req , res , next) => {
  try{
    const data = await blogs.find({})
    // console.log(data)
    if(!data) throw new Error('there is no posts in db')
    res.json(
      data
    )
  }
 catch(err){
   res.json({message : err.message , success : false})
 }
 
})

const Ajv = require("ajv")
const ajv = new Ajv()

//schema for login for now , todo : remove username requirment , and hash password
const schema = {
  properties: {
    username: {type: "string"}, //todo : remove it later , dont need name for login
    email: {type: "string"} ,
    password : {type: "string"}

  },
  required: ["username" , "email" , "password"],
  additionalProperties: false
}

// hasching library
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const users = db.get('users')
app.post('/login' , cors({origin : "http://localhost:3000"}) , async (req , res ) => { // todo : remove validating jwt 
  try{
    console.log(req.body)
    const valid = await ajv.validate(schema, req.body)
          console.log('valid' ,  valid)  
    if(valid) {  // 1. lvl deep
      
      const check = await users.findOne({email : req.body.email})
      console.log('data' , check)
     
      if(!check) {throw new Error('there is no user with that email in db')}
      if(check){  // 2. lvl deep
        const match = await bcrypt.compare(req.body.password , check.password);
        
           // if we have match allow login if not throw err
        if(match){res.status(200).json({message : 'login accepted' , success : true , username : check.username})}
        else {  // 3. lvl deep
          console.log('we have no match')
          throw new Error("invalid credentials")
        }
        if(!match) {}
    }

      }
          
      
   else if(!valid) {res.status(400).json({message : 'invalid login schema' ,  success : false})}
   
   
  } catch(err){
    // console.log(err)
    res.status(400).json({message : err.message , success : false})
  }
 
})


// this is needed bcs retarded browser is sending preflight on POST request , for some reason????????
app.options("/register", function(req, res){
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', '*');
  res.status(204).send('response from options'); //remove send in development
});


app.post('/register' , cors({origin : "http://localhost:3000"}) , async (req , res ) => {
   console.log(req.headers , req.body , req.params , req.query)
  try{
    const valid = await ajv.validate(schema, req.body)
 
    if(valid) {
      const checkEmail = await users.findOne({ email : req.body.email })
      const checkUsername = await users.findOne({ username : req.body.username })
    

        if(!checkEmail && !checkUsername){
            
            bcrypt.hash(req.body.password, 10, async function(err, hash) {
            if(err){ throw new Error('problem with hash')} // just dev thing , remove in production
          
            req.body.password = hash ;
          

          //insert user to db
            await users.insert(req.body)
          // search again for his _id
         const data =  await users.findOne({ email : req.body.email })
          const token = sighJWT(data)
          console.log(data , token)
          res.cookie('access_token', token , { httpOnly: true });
          res.status(200).json({message : 'you are registred' ,
           success : true , username : req.body.username ,
           
          });

        })}
        else {throw new Error("email or username is in use")}
    }
    if(!valid) {res.status(400).json({message : 'invalid register schema' ,  success : false})}
  } catch(err){
    res.status(400).json({message : err.message , success : false})
  }


})

app.get('/cookie' , validateJwt , (req , res) => {
console.log(res.locals.authenticated , res.locals.user , res.locals.email)
res.status(418).send('work')
})


// middleware for validating jwt tokens
 async function validateJwt(req , res , next){
try{

  const superSecret ='sahbdvadj17et6732787gyf87oh9viuycUIBY37O7F8WyubfIEB7BbdahusnuuguduidsahbgsbahnsdbsanajdbguyiA3rq8' 

  const ber = req.headers.cookie.split('=')[1]  // parse auth headers , to get token
  const decoded = jwt.verify(ber, superSecret);
  console.log('decoded'  , decoded)
if(decoded){
  
    res.locals.user = decoded.data[0];  // data = [username , email , id]
    res.locals.email = decoded.data[1]; // passing to next middleware
    res.locals.authenticated = true ;  
   
  next()
}
  
}catch(err){              // remove message in production
 res.status(403).json({message : err.message , messageProduction : "invalid token" , success : false})
}

}

// pure function for singing jwt 
const sighJWT =  function signJwt(data){

try {
  const superSecret = 'sahbdvadj17et6732787gyf87oh9viuycUIBY37O7F8WyubfIEB7BbdahusnuuguduidsahbgsbahnsdbsanajdbguyiA3rq8' 

  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // expire time in seconds (60 * 60) = 1h
    data: [data.username , data.email , data._id] // hardcoded example
  }, superSecret);

  return token ;
} catch(err) {
  console.log(err)
}

  }


