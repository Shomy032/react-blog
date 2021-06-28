// local mongo , losed it 3 times soo far
// const db = require("monk")("localhost:27017/blog"); // to add credentials
// mongo cluster , google cloud platform
const db = require("monk")("mongodb+srv://milos:desidesi123@myclustershomy.86e0h.mongodb.net/blog?retryWrites=true&w=majority")
// not tested yet

const blogs = db.get("blog-posts");
const posts = db.get("posts");  
const users = db.get("users");  
const comment = db.get("comment");
const resetCode = db.get("resetCode")

const allFiltersYouHave = [
    "html",
    "css",
    "js",
    "react",
    "redux",
    "angular",
    "node",
    "go",
    "dom",
    "vue",
    "php",
    "pc",
    "nosql",
    "sql",
    "database",
    "c#",
    ".net",
    "express",
    "java",
    "oop",
    "git",
    "other",
    "docker",
    "graph",
    "http1.1",
    "http2.0",
    "quic",
    "ip",
    "networking",
    "algorithm",
    "data",
    "server",
    "serverless",
    "crypto",
    "file",
    "tls",
    "tcp",
    "udp",
    "bash",
    "ssh",
    "telnet",
    "security",
    "password",
    "xss",
    "cors",
    "jwt",
    "cookie",
    "md",
    "scss",
    "swift",
    "ddos",
    "limiting",
    "status",
    "c#",
    "c++",
    "linux",
    "windows",
    "mac",
    "python",
  ]; // BIG TODO HERE


module.exports = {
  resetCode : resetCode ,
    posts : posts ,
    blogs : blogs ,
    users : users ,
    comment : comment ,
    allFiltersYouHave : allFiltersYouHave ,
    db : db // need this to close connection in tests
}

