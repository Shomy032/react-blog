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


const metadata =  {name : 'Firts post',
description : 'this is first post' ,
date : '' ,
author : 'pera peric' ,
about_author : '' ,
picture : '',
links : [],
social_links : []
}
let part1 = { 
  h1 : '<script>console.log(\'123\')<script>',
p : "start",
img_path : './pictures/test-bl.png'} 

let part2 = {p : '2. p element dsadas ddddddd ddddddd ddddddd dddddd ddddddd ddddd ddddddd dddddddd dasdasd adasd asdas dasdadAa ADdaDadAD adAadADaAD adadad' ,
h1 : 'asdasdee`11111'} 
let part3 = {
img_path : './pictures/test.png',
p  : "ja sam idiot , bla bla , ja mislim da ce ovaj arital da bud ecoll smrdis nagorana mnogo jebem ti se sam makom svuda i uvek smo na svemu",
h1 : 'end'
}
// blogs.insert({ name : 'Firts post' ,metadata , content : [ part1 , part2 , part3]})
// blogs.insert({post})
app.get('/blogs/:id' , cors() /*for now*/,  async (req , res , next) => {
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

app.get('/blogs' , cors() /*for now*/,  async (req , res , next) => {
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
    username: {type: "string"},
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
app.post('/login' , cors() , validateJwt , async (req , res ) => {
  try{
    const valid = await ajv.validate(schema, req.body)
   // console.log(valid)
   // console.log(req.body)
    if(valid) {
      
      const check = await users.findOne({email : req.body.email})
      if(check){
        const match = await bcrypt.compare(req.body.password , check.password);
        console.log(match)
  
        if(match){res.status(200).json({message : 'login accepted' , success : true , username : check.username})}
        else {throw new Error("invalid credentials")}
    }

      }
          //  console.log(check);
      
    if(!valid) {res.status(400).json({message : 'invalid login schema' ,  success : false})}
  } catch(err){
    res.status(400).json({message : err.message , success : false})
  }
 
})

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   next();
// });


// , (req , res ) =>{

//   try{   
//     // console.log('req :::' , JSON.stringify(req))
  
//     res.set('Access-Control-Allow-Origin' , '*')
//     res.set('Access-Control-Allow-Methods', 'GET,POST')
//   }catch(err){
//   // console.log('err :::' , err)
//   } finally {
//     console.log('end')
//   }
    
  
//   }

// app.options('/register' , cors({origin : "http://localhost:3000"}) )

app.options("/register", function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.status(204).send('response from options');
});


app.post('/register' , cors({origin : "http://localhost:3000"}) , async (req , res ) => {
   
  // console.log('BODY ::::' ,  JSON.stringify(req.body) ,'HEAD ::::' ,JSON.stringify(req.headers) )
 
  try{
    const valid = await ajv.validate(schema, req.body)
 
    if(valid) {
      const checkEmail = await users.findOne({ email : req.body.email })
      const checkUsername = await users.findOne({ username : req.body.username })
    

        if(!checkEmail && !checkUsername){
            
            bcrypt.hash(req.body.password, 10, async function(err, hash) {
            if(err){ throw new Error('problem with hash')} // just dev thing , remove in production
          //  console.log(req.body.password , hash)
            req.body.password = hash ;
          //  console.log(req.body.password)

          //insert user to db
            await users.insert(req.body)
          // search again for his _id
         const data =  await users.findOne({ email : req.body.email })
          const token = sighJWT(data)
          console.log(data , token)
          res.status(200).json({message : 'you are registred' ,
           success : true , username : req.body.username ,
          access_token : token
          });

        })}
        else {throw new Error("email or username is in use")}
    }
    if(!valid) {res.status(400).json({message : 'invalid register schema' ,  success : false})}
  } catch(err){
    res.status(400).json({message : err.message , success : false})
  }


})








// middleware for validating jwt tokens
 async function validateJwt(req , res , next){
try{
  const superSecret ='sahbdvadj17et6732787gyf87oh9viuycUIBY37O7F8WyubfIEB7BbdahusnuuguduidsahbgsbahnsdbsanajdbguyiA3rq8' 
  const ber = req.headers.authorization.split(' ')[1];
 // console.log(ber); //def stuff
  const decoded = jwt.verify(ber, superSecret);
if(decoded){
// console.log('decoded :::' ,decoded)  // just for dev
    res.locals.user = req.body.username;  
    res.locals.authenticated = true ;
    console.log("res.locals ::: " , res.locals)
  next()
}
  
}catch(err){
 res.status(403).json({message : err.message , messageProduction : "invalid token" , success : false})
}

}

// pure function for singing jwt 
const sighJWT =  function signJwt(data){

try {
  const superSecret = 'sahbdvadj17et6732787gyf87oh9viuycUIBY37O7F8WyubfIEB7BbdahusnuuguduidsahbgsbahnsdbsanajdbguyiA3rq8' 

  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // time in seconds 3600 for 1h or (60 * 60)
    data: [data.username , data.email , data._id] // hardcoded example
  }, superSecret);

  return token ;
} catch(err) {
  console.log(err)
}

  }



  /// just for dev testing

// app.post('/test/jwt' ,  signJwt , async (req , res , next) => {
//    res.status(201).json({message : "good call" , success : "true"})
// })






//  //
// const a = {
//   "_id": "60b09ee2ab4af22fc0650332",
//   "name": "First pos here , obout sql",
//   "metadata": {
//     "name": "First pos here , obout sql",
//     "description": "this is first post here abot sql , bla bla and her ewe gona dot ha and we are gonn do that",
//     "date": "28.05.2021",
//     "author": "pera peric",
//     "about_author": "",
//     "picture": "./pictures/test-bl.png",
//     "avatar": "./pictures/avatar.jpg",
//     "links": [],
//     "social_links": []
//   },
//   "content": [
//     {
//       "h1": "<script>console.log('123')<script>",
//       "p": "nameeeee",
//       "img_path": "./pictures/test-bl.png"
//     },
//     {
//       "p": "2. p element dsadas ddddddd ddddddd ddddddd dddddd ddddddd ddddd ddddddd dddddddd dasdasd adasd asdas dasdadAa ADdaDadAD adAadADaAD adadad",
//       "h1": "asdasdee`11111"
//     },
//     {
//       "img_path": "./pictures/test.png",
//       "p": "ja sam idiot , bla bla , ja mislim da ce ovaj arital da bud ecoll smrdis nagorana mnogo jebem ti se sam makom svuda i uvek smo na svemu",
//       "h1": "end"
//     }
//   ]
// }


// const b = [
//   {
//     "_id": "60b09ee2ab4af22fc0650332",
//     "name": "First pos here , obout sql",
//     "metadata": {
//       "name": "First pos here , obout sql",
//       "description": "this is first post here abot sql , bla bla and her ewe gona dot ha and we are gonn do that",
//       "date": "28.05.2021",
//       "author": "pera peric",
//       "about_author": "",
//       "picture": "./pictures/test-bl.png",
//       "avatar": "./pictures/avatar.jpg",
//       "links": [],
//       "social_links": []
//     },
//     "content": [
//       {
//         "h1": "<script>console.log('123')<script>",
//         "p": "nameeeee",
//         "img_path": "./pictures/test-bl.png"
//       },
//       {
//         "p": "2. p element dsadas ddddddd ddddddd ddddddd dddddd ddddddd ddddd ddddddd dddddddd dasdasd adasd asdas dasdadAa ADdaDadAD adAadADaAD adadad",
//         "h1": "asdasdee`11111"
//       },
//       {
//         "img_path": "./pictures/test.png",
//         "p": "ja sam idiot , bla bla , ja mislim da ce ovaj arital da bud ecoll smrdis nagorana mnogo jebem ti se sam makom svuda i uvek smo na svemu",
//         "h1": "end"
//       }
//     ]
//   },
//   {
//     "_id": "60b09f69c0a4f246a8f9e26e",
//     "name": "Firts post",
//     "metadata": {
//       "name": "Firts post",
//       "description": "this is first post",
//       "date": "",
//       "author": "pera peric",
//       "about_author": "",
//       "picture": "",
//       "links": [],
//       "social_links": []
//     },
//     "content": [
//       {
//         "h1": "<script>console.log('123')<script>",
//         "p": "start",
//         "img_path": "./pictures/test-bl.png"
//       },
//       {
//         "p": "2. p element dsadas ddddddd ddddddd ddddddd dddddd ddddddd ddddd ddddddd dddddddd dasdasd adasd asdas dasdadAa ADdaDadAD adAadADaAD adadad",
//         "h1": "asdasdee`11111"
//       },
//       {
//         "img_path": "./pictures/test.png",
//         "p": "ja sam idiot , bla bla , ja mislim da ce ovaj arital da bud ecoll smrdis nagorana mnogo jebem ti se sam makom svuda i uvek smo na svemu",
//         "h1": "end"
//       }
//     ]
//   }
// ]