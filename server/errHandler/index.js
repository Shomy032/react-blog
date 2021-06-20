
function errorHandler(err, req, res, next) {
    // console.log("there is err in last middleware", err);
     if (err) {
       res
         .status(400)
         .json({ message: err.message || "there is err", success: false });
     } else {
       res.sendStatus(500);
     }
   } //todo add or remove

module.exports = {
    errorHandler : errorHandler 
}
