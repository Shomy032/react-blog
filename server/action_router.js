const { response } = require("express");
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { errorHandler } = require("./errHandler"); //1

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
  validateJwt, // validate auth , function at end of this file
  (req, res, next) => {
    //  console.log("token validation is passed"); // remove
    next();
  }
);

// TODO : comment , like/upvote , replay , edit , edit profile
const { posts, users, comment } = require("./config");
const { postSchema, commentSchema, ajv, schemaLike } = require("./schemas"); // ajv is validator

router.post(
  "/post",
  validateJwt ,
  async (req, res, next) => {
    try {
      const valid = await ajv.validate(postSchema, req.body);
      if (!valid) {
        //   console.log( valid )
        throw new Error("there is err with schema");
      } else {
        //  console.log( 'WE ARE IN ELSE BLOCK' )
        // dont need to parse jwt here , its parsed in middleware and passed here in "locals"
        const { allFiltersYouHave } = require("./config");
        // git list fo tags

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
          name: req.body.name || "sorry , there is no name...",
          text: req.body.text || "sorry , there is no text...",
          author: res.locals._id, // added from jwt
          authorName : res.locals.user ,
          likes: 0,
          peopleLiked: [],
          date: new Date(),
          tags: [], // todo add more validation here
          comments: [],
          edited: false,
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
  errorHandler
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
            peopleLiked: [],
            commentedOn: req.body.postedOnId,
            edited: false,
          });

          if (req.body.postedOnId) {
            let comm = [...search.comments, commentInDb._id];
            // console.log("new comm ::", comm);
            // console.log("req.body.postedOnId :::", req.body.postedOnId);
            const host = await posts.update(
              { _id: req.body.postedOnId },
              { $set: { comments: comm } }
            );

            // , { upsert: true }   // maybe
            if (host.ok) {
              // console.log('returning')

              return [true, host]; //find return
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
          redirect: true,
        });
      } else {
        throw new Error("there is err1");
      }
    } catch (err) {
      next(err);
    }
  },
  errorHandler
);

// const { posts, users, comment } = require("./config");
// schemaLike

// todo make this check for dislike
router.post(
  "/like",
  async (req, res, next) => {
    // console.log("in like route" , schemaLike, req.body )
    try {
      const valid = await ajv.validate(schemaLike, req.body);

   //   console.log(valid, ":::  valid");
      if (valid === true) {
        const { postType, postId, actionType } = req.body;
        const { authenticated, _id } = res.locals; // data from jwt
        //    console.log(valid , authenticated , req.body.postType , req.body.postId)

        if (actionType === "like") {
          if (authenticated && postType === "post") {
            //  console.log('we are in posts')
            const onepost = await posts.find({ _id: postId });
            //    console.log(onepost , 'onepost' , onepost.length)
            if (onepost.length !== 0) {
              //    console.log('we have post')
              const { peopleLiked, author, likes } = onepost[0];

              if (author === _id) {
                throw new Error("you cant like your own post");
              } else if (peopleLiked.includes(_id)) {
                // todo make this check for dislike
                throw new Error("you have alredy liked that post or comment");
              } else {
                //  const fi = await posts.find({ _id: postId} , {likes : 1 , peopleLiked : 1})
                //  console.log(fi , "fi")
                const host = await posts.update(
                  { _id: postId },
                  {
                    $set: {
                      likes: likes + 1,
                      peopleLiked: [...peopleLiked, _id],
                    },
                  }
                );
                const { n, nModified, ok } = host;
                if (n && nModified && ok) {
                  //  console.log('all good')
                  res
                    .status(201)
                    .json({
                      success: true,
                      message: "you have successfully liked",
                    });
                } //todo add dislike
                // console.log( host , 'res after updating' )
              }

              //   console.log('log' , peopleLiked , peopleLiked.length , peopleLiked.includes(_id))
            } else {
              //    console.log('we dont have post')
              throw new Error("there is no post with that id");
            }
          } else if (authenticated && postType === "comment") {
            //  console.log('we are in posts')
            const oneComment = await comment.find({ _id: postId });
            //    console.log(onepost , 'onepost' , onepost.length)
            if (oneComment.length !== 0) {
              //    console.log('we have post')
              const { peopleLiked, author, likes } = oneComment[0];

              if (author === _id) {
                throw new Error("you cant like your own comment");
              } else if (peopleLiked.includes(_id)) {
                // todo make this check for dislike
                throw new Error("you have alredy liked that post or comment");
              } else {
                //  const fi = await posts.find({ _id: postId} , {likes : 1 , peopleLiked : 1})
                //  console.log(fi , "fi")
                const host = await comment.update(
                  { _id: postId },
                  {
                    $set: {
                      likes: likes + 1,
                      peopleLiked: [...peopleLiked, _id],
                    },
                  }
                );
                const { n, nModified, ok } = host;
                if (n && nModified && ok) {
                  //  console.log('all good')
                  res
                    .status(201)
                    .json({
                      success: true,
                      message: "you have successfully liked",
                    });
                } //todo add dislike
                // console.log( host , 'res after updating' )
              }

              //   console.log('log' , peopleLiked , peopleLiked.length , peopleLiked.includes(_id))
            } else {
              //    console.log('we dont have post')
              throw new Error("there is no comment with that id");
            }
          } else {
            throw new Error("postType needs to be 'post' or 'comment' ");
          }
        } // todo make function
        else if (actionType === "dislike") {
          if (authenticated && postType === "post") {
            //  console.log('we are in posts')
            const onepost = await posts.find({ _id: postId });
            //    console.log(onepost , 'onepost' , onepost.length)
            if (onepost.length !== 0) {
              //    console.log('we have post')
              const { peopleLiked, author, likes } = onepost[0];

              if (author === _id) {
                throw new Error("you cant dislike your own post");
              } else if (!peopleLiked.includes(_id)) {
                // todo make this check for dislike
                throw new Error(
                  "err , you cant dislike what you are not liked first"
                );
              } else {
                //  const fi = await posts.find({ _id: postId} , {likes : 1 , peopleLiked : 1})
                //  console.log(fi , "fi")
                const newPeopleLiked = peopleLiked.filter((e) => e !== _id);
                const host = await posts.update(
                  { _id: postId },
                  {
                    $set: {
                      likes: likes - 1,
                      peopleLiked: [...newPeopleLiked],
                    },
                  } // change peopleliked
                );
                const { n, nModified, ok } = host;
                if (n && nModified && ok) {
                  //  console.log('all good')
                  res
                    .status(201)
                    .json({
                      success: true,
                      message: "you have successfully disliked",
                    });
                } //todo add dislike
                // console.log( host , 'res after updating' )
              }

              //   console.log('log' , peopleLiked , peopleLiked.length , peopleLiked.includes(_id))
            } else {
              //    console.log('we dont have post')
              throw new Error("there is no post with that id");
            }
          } else if (authenticated && postType === "comment") {
            //  console.log('we are in posts')
            const onepost = await comment.find({ _id: postId });
            //    console.log(onepost , 'onepost' , onepost.length)
            if (onepost.length !== 0) {
              //    console.log('we have post')
              const { peopleLiked, author, likes } = onepost[0];

              if (author === _id) {
                throw new Error("you cant dislike your own post");
              } else if (!peopleLiked.includes(_id)) {
                // todo make this check for dislike
                throw new Error(
                  "err , you cant dislike what you are not liked first"
                );
              } else {
                //  const fi = await posts.find({ _id: postId} , {likes : 1 , peopleLiked : 1})
                //  console.log(fi , "fi")
                const newPeopleLiked = peopleLiked.filter((e) => e !== _id);
                const host = await comment.update(
                  { _id: postId },
                  {
                    $set: {
                      likes: likes - 1,
                      peopleLiked: [...newPeopleLiked],
                    },
                  } // change peopleliked
                );
                const { n, nModified, ok } = host;
                if (n && nModified && ok) {
                  //  console.log('all good')
                  res
                    .status(201)
                    .json({
                      success: true,
                      message: "you have successfully disliked",
                    });
                } //todo add dislike
                // console.log( host , 'res after updating' )
              }

              //   console.log('log' , peopleLiked , peopleLiked.length , peopleLiked.includes(_id))
            } else {
              //    console.log('we dont have post')
              throw new Error("there is no comment with that id");
            }
          } else {
            throw new Error("postType needs to be 'post' or 'comment' ");
          }
        } else {
          throw new Error("actionType must be like or dislike");
        }
      } else {
        throw new Error("invalid schema");
      }
    } catch (err) {
      // console.log(err , err.message)
      next(err);
    }
  },
  errorHandler
);

const { schemaEdit } = require("./schemas");
router.post(
  "/edit",
  async (req, res, next) => {
    // check who is user
    // if is good
    // find post
    //or comment
    // and add edited flag
    // respond with new post
    try {
      const valid = await ajv.validate(schemaEdit, req.body);
      if (valid) {
        const { postId, postType, newText } = req.body;
        const { user, _id } = res.locals; // todo add author name
        // console.log(postType , 'postType'  , postType === "post")
        if (postType === "post") {
          const check = await posts.find({ _id: postId, author: _id });
          if (check.length !== 0) {
            const update = await posts.update(
              { _id: postId, author: _id },
              { $set: { text: newText, edited: true } },
              { upsert: false }
            );
          //  console.log(update, "update");
            const { n, nModified, ok } = update;
            if (n && nModified && ok) {
              check[0].edited = true;
              check[0].text = newText;
              res
                .status(201)
                .json({
                  success: true,
                  message: "editet successfully",
                  editedPost: check[0],
                });
            } else {
              throw new Error("not modified");
            }
          } else {
            throw new Error(
              "there is no post like that , or you are not author"
            );
          }
        } else if (postType === "comment") {
          //  console.log(postId , _id)
          const check = await comment.find({ _id: postId, authorId: _id });
       //   console.log(check, "check");

          if (check.length !== 0) {
            const update = await comment.update(
              { _id: postId, authorId: _id },
              { $set: { text: newText, edited: true } },
              { upsert: false }
            );
            //  console.log(update , "update")
            const { n, nModified, ok } = update;
            if (n && nModified && ok) {
              check[0].edited = true;
              check[0].text = newText;
              res
                .status(201)
                .json({
                  success: true,
                  message: "editet successfully",
                  editedComment: check[0],
                });
            } else {
              throw new Error("not modified");
            }
          } else {
            throw new Error(
              "there is no comment like that , or you are not author"
            );
          }
        } else {
          //  console.log("we have schema err")
          throw new Error('postType must be "post" or "comment" ');
        }
      } else {
        throw new Error("invalid schema");
      }
    } catch (err) {
      next(err);
    }
  },
  errorHandler
);

// used at all routes in this file
// middleware for validating jwt tokens
// todo : export it from another file
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

// (err, req, res, next) => {
//   // console.log('there is err in last middleware' , err)
//   if (err) {
//     res
//       .status(400)
//       .json({ message: err.message || "there is err", success: false });
//   } else {
//     res.sendStatus(500);
//   }
// }
