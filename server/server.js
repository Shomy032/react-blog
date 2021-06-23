const express = require("express");
const app = express();


app.use(express.json()); // parse all data , and accept only application/json  
 
 

const morgan = require("morgan");
app.use(morgan("tiny"));

require("dotenv").config(); 
const { posts , blogs } = require('./config') // get db collections

const cors = require("cors");


app.use(cors( { origin: "http://localhost:3000" } )) // use cors for react dev server

const path = require('path');


app.use( express.static(path.join(__dirname , 'build')));
// app.get("/" , (req , res , next) => {
//   res.status(200).sendFile('/index.html');
// })

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'build', 'index.html'));
})


app.get(
  "/blogs/:id",
  async (req, res) => {
    try {
      const data = await blogs.findOne({ name: req.params.id }); // 2
      
      if (!data) { throw new Error("that post is not in database"); }
      res.json({ ...data });
    } catch (err) {
      res.json({ message: err , success: false });
    }
  }
);

app.get(
  "/blogs",
 
  async (req, res) => {
    try {
      const data = await blogs.find({});  
      
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
app.use("/action", actionRoutes); // fix it



const { postRouter } = require('./posts_routes')
app.use('/posts' , postRouter)


// FOR TROUBLESHOOTING  JEST
// app.get('/testing' , async (req , res , next) =>{
  
//   res.status(200).json({
//     message : 'its working'
//   })
  
//   })


module.exports = app ; // exported to use in __test__




// obj[Object.keys(obj)[0]] // cool trick to get first thing in obj

        

           