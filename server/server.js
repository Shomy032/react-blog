const express = require('express');
const app = express();
app.use(express.json())

const db = require('monk')('localhost:27017/blog')
const blogs = db.get('blog-posts')

const morgan = require('morgan')
app.use(morgan('tiny'))

require('dotenv').config()
const PORT = process.env.PORT || '4002'; // 4002 in dev

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

  const authRoutes = require('./auth_router')
  app.use('/auth', authRoutes)
  

//ALL ROUTES THAT NEED VALIDATION E.G. COMMENT , REPLY , EDIT ...
const actionRoutes = require('./action_router'); // actionRoutes = {router , method1 , method2}
app.use('/action', actionRoutes.router) // fix it


// todo mome this to module
  const posts = db.get('posts')
  app.get('/posts/all', cors({origin : "http://localhost:3000"}) , async (req , res , next) =>{
    const all = await posts.find({}) // this should return all
     res.status(200).json(all) 
  })
 
  // todo : enable searching by partial , now you need full name
  app.get('/posts/search/:query', cors({origin : "http://localhost:3000"}) , async (req , res , next) =>{ // search and return one or more or null
       let search = req.params.query.split('_').join(' ') // parse string
      const one = await posts.find({ name : search })
      console.log(one.length)
      if(one.length === 0){res.sendStatus(404)}
      else { res.status(200).json(one)} 
  })
