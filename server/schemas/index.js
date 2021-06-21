const Ajv = require("ajv");
const ajv = new Ajv();

//schema for login for now , todo : remove username requirment , and hash password
const schema = {
    properties: {   
      email: { type: "string" },
      password: { type: "string" },
    },
    required: [ "email", "password"],
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

  const schemaLike = {
    properties: {
     postId : { type : "string" },
     postType : { type : "string"  },
     actionType : { type : "string"  }
    },
     required: [  "postId" , "postType" , "actionType" ],
     additionalProperties: false
  }

  const schemaEdit = {
    properties: {
     postId : { type : "string" },
     postType : { type : "string"  },
     newText : { type : "string" }
    },
     required: [  "postId" , "postType" , "newText"],
     additionalProperties: false
  }

const getComments = {
  properties: {
    postId : { type : "string" },
    allCommentsIdArray :  { type : "array" }
   },
    required: [  "postId" , "allCommentsIdArray" ],
    additionalProperties: false
}

module.exports = {
    schema  : schema ,
    postSchema : postSchema ,
    commentSchema : commentSchema ,
    schemaLike : schemaLike ,
    schemaEdit : schemaEdit ,
    getComments : getComments ,
    ajv : ajv
}