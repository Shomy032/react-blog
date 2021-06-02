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

app.get('/blogs/' , cors() /*for now*/,  async (req , res , next) => {
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