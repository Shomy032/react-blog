// this is needed for testing to work

const app = require('./server')

const PORT = process.env.PORT || "4002"; 
app.listen(PORT, () => { 
  console.log(`i am listening on localhost:${PORT}`);
});