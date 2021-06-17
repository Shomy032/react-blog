const db = require("monk")("localhost:27017/blog"); // to add credentials

const blogs = db.get("blog-posts");
const posts = db.get("posts");  
const users = db.get("users");  
const comment = db.get("users");

const schemas = {

}



module.exports = {
    posts : posts ,
    blogs : blogs ,
    users : users ,
    comment : comment ,
    schemas : schemas ,
    db : db // need this to close connection in tests
}

