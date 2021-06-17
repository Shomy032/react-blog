const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

// log time and where request is comeing from
// this is not needed remove if you want
router.use((req, res, next) => {
  console.log("Time: ", new Date(), "from action router");
  next();
});

router.use(
  (req, res, next) => {
    // console.log('...validating...') ;
    next(); // remove
  },
  validateJwt, // validate auth
  (req, res, next) => {
    console.log("token validation is passed"); // remove
    next();
  }
);

// TODO : comment , like/upvote , replay , edit , edit profile
const { posts, users, comment } = require("./config");
const { postSchema, commentSchema, ajv } = require("./schemas"); // ajv is validator

router.post(
  "/post",
  async (req, res, next) => {
    try {
      const valid = await ajv.validate(postSchema, req.body);
      if (!valid) {
        //   console.log( valid )
        throw new Error("there is err with schema");
      } else {
        //  console.log( 'WE ARE IN ELSE BLOCK' )
        // dont need to parse jwt here , its parsed in middleware and passed here in "locals"
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
        
        function filterValidator(arr, store = []) {
          result = [];
          store.forEach((e) => {
            if (arr.includes(e)) {
              result.push(true);
            } else {
              result.push(false);
            }
          });

          let res = result.every((e) => e == true);
          if (res === true) {
            return store;
          } else {
            return store.filter((e, i) => result[i] === true);
          }
        }

        let post = {
          name: req.body.name,
          text: req.body.text,
          author: res.locals._id, // added from jwt
          likes: 0,
          peopleLiked: [],
          date: new Date(),
          tags: [], // todo add more validation here
          comments: [],
        };
        post.tags = filterValidator(allFiltersYouHave, req.body.tags);

        const added = await posts.insert(post);

        res.status(201).json({
          id: added._id,
          message: "post is added",
          success: true,
          redirect: true,
        });
      }
    } catch (err) {
      //  console.log('there is err in catch blok' , err)
      next(err);
    }
  },
  (err, req, res, next) => {
    // console.log('there is err in last middleware' , err)
    if (err) {
      res
        .status(400)
        .json({ message: err.message || "there is err", success: false });
    } else {
      res.sendStatus(500);
    }
  }
);

router.post(
  "/comment",
  async (req, res, next) => {
    // console.log( res.locals.user , res.locals._id )
    try {
      // console.log("validating");
      const valid = await ajv.validate(commentSchema, req.body);
      if (!valid) {
        // console.log("if invalid schema validating");
        throw new Error("there is err with schema");
      }
    } catch (err) {
      next(err);
    }
    try {
      
        async function updateComments(user, userId, text) {
          const search = await posts.findOne({ _id: req.body.postedOnId });

          // console.log("search", search);
          if (search._id && search.comments) {
            const commentInDb = await comment.insert({
              text: text,
              author: user,
              authorId: userId,
              likes: 0,
            });

            if (req.body.postedOnId) {
              let comm = [...search.comments, commentInDb._id];
              // console.log("new comm ::", comm);
              // console.log("req.body.postedOnId :::", req.body.postedOnId);
              const host = await posts.update(
                { _id: req.body.postedOnId },
                { $set: { comments: comm } },
                { upsert: true }
              );
              
              if (host.ok) {
                // console.log('returning')

                return [ true, host ]; //find return

              } else {
                // return []
                // console.log('throw err bcs host is falsy')
                throw new Error("there is err5");
              }
            } else {
              throw new Error("there is err4");
            }
          } else {
            throw new Error("there is err3");
          }
        }

// console.log('calling function')
  // console.log('function' ,  updateComments(res.locals.user, res.locals._id, req.body.text ))
        let [add, host] = await updateComments(
          res.locals.user,
          res.locals._id,
          req.body.text
        );

        // console.log('after function')
        // console.log('after functiom',  add , host)
        if (add) {
          res.status(201).json({
            message: "comment added",
            success: true,
            redirect: true
          });
        } else {
          throw new Error("there is err1");
        }
       
    } catch (err) {
      next(err);
    }
  },
  (err, req, res, next) => {
    // console.log('there is err in last middleware' , err)
    if (err) {
      res
        .status(400)
        .json({ message: err.message || "there is errEnd", success: false });
    } else {
      res.sendStatus(500);
    }
  }
);

router.post("/like", (req, res, next) => {});
router.post("/replay", (req, res, next) => {});

router.put("/edit", (req, res, next) => {});
router.put("/edit-profile", (req, res, next) => {
  // probably its to much
});

// used at all routes in this file
// middleware for validating jwt tokens
async function validateJwt(req, res, next) {
  try {
    const superSecret = process.env.SECRET;

    const ber = req.headers.cookie.split("=")[1]; // parse auth headers , to get token
    const decoded = jwt.verify(ber, superSecret);

    //  console.log("decoded", decoded);

    if (decoded) {
      res.locals.user = decoded.data[0]; // data = [username , email , id]
      res.locals.email = decoded.data[1]; // passing to next middleware
      res.locals._id = decoded.data[2];

      res.locals.authenticated = true; // maybe not needed

      next();
    }
  } catch (err) {
    // redirect here , maybe

    res.status(403).json({
      message: err.message, // remove message in production
      messageProduction: "invalid token",
      success: false,
      redirect: true, // redirecto to login popup
    });
  }
}

function errorHandler(err, req, res, next) {}

module.exports = router;

// export default {
//   validateJwt  ,
//    router ,
//    basicSum ,
//    advancedSum
// }

// module.exports = {
//   validateJwt  ,
//    router ,
//    basicSum
// }
