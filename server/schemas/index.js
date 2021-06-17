const Ajv = require("ajv");
const ajv = new Ajv();

//schema for login for now , todo : remove username requirment , and hash password
const schema = {
    properties: {
      username: { type: "string" }, //todo : remove it later , dont need name for login
      email: { type: "string" },
      password: { type: "string" },
    },
    required: ["username", "email", "password"],
    additionalProperties: false,
  };



// const innerArraySchema = {
//   "type": "array",
//   "items" : "string"
//   }
  const postSchema = {
    properties: {
      name : { type: "string" }, 
      text : { type: "string" },
      tags : { type : "array" }
    },
    required: ["name", "text" ],
    additionalProperties: false,
  };


  const commentSchema = {
    properties: {
      text : { type: "string" } ,
      postedOnId : { type : "string" }
    },
    required: [ "text" , 'postedOnId' ],
    additionalProperties: false,
  };




module.exports = {
    schema  : schema ,
    postSchema : postSchema ,
    commentSchema : commentSchema ,
    ajv : ajv
}