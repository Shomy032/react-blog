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

  schemaRegister = {

    properties: {   
      username :  { type: "string" },
      email: { type: "string" },
      password1: { type: "string" },
      password2: { type: "string" },
    },
    required: [ "email", "password1" , "password2" , "username"],
    additionalProperties: false,


  }


  const commentSchema = {
    properties: {
      text : { type: "string" } ,
      postedOnId : { type : "string" }
    },
    required: [ "text" , 'postedOnId' ],
    additionalProperties: false,
  };
  const getAllCommentsSchema = {
    properties: {
      postId : { type : "string" }
    },
    required: [  'postId' ],
    additionalProperties: false,
  }


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

const resetEmailSchema = {
  properties: {
    email : { type : "string" },
   },
    required: [  "email"  ],
    additionalProperties: false
}

const resetEmailCode = {
  properties: {
    code : { type : "string" },
    email : {type : "string"}
   },
    required: [  "code" , "email"  ],
    additionalProperties: false
}

module.exports = {
    schema  : schema ,
    resetEmailCode : resetEmailCode ,
    resetEmailSchema : resetEmailSchema ,
    schemaRegister : schemaRegister ,
    postSchema : postSchema ,
    commentSchema : commentSchema ,
    schemaLike : schemaLike ,
    schemaEdit : schemaEdit ,
    getComments : getComments ,
    getAllCommentsSchema : getAllCommentsSchema ,
    ajv : ajv
}