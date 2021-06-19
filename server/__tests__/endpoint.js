// const req = supertest(app)
// const jest = require('jest')

// supertest.useFakeTimers()

// it(' 1.st test with jest , on testing endpoint ', async function done() {
//     // Sends GET Request to /testing endpoint
//     try{

//         req.get('/testing')
//     .expect(res.status).toBe(200)
//     .expect(res.body.message).toBe('its working')
//     .end((err) =>{
//         if(err) {
//             console.log('there is err' , err )
//             return done(err)
//         } else {
//             return done()
//         }
//         })

//     }catch(err){
//         console.log(err)
//         // who cares
//     }

//   })

const app = require("../server.js");
const supertest = require("supertest");
const request = supertest(app);
const { db } = require("../config");
const { set } = require("../server.js");

beforeAll((done) => {
  done();
});

describe("name your test wraper ",  () => {
 
async function call(path){
    try{
        const res = await request.post(path).send({
            name: "my firts test question",
            text: "lorem lapus100",
            tags: ["html", "js"],
          }).set('Cookie' , "access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjQyMzIyNDAsImRhdGEiOlsibWlsb3MiLCJteW1haWxAZ21haWwuY29tIiwiNjBjNjk2YjA2ODcxNmQzZThjYTAzNDZhIl0sImlhdCI6MTYyMzYyNzQ0MH0.WKamOPE73XH2-0CjknqXLMKRli0VUmGKv2nJTQNKnu8")
          // THIS COOKIE HAVE EXP DATE , SO TEST WILL MAYBE FAIL BCS OF THAT
          return resultOfCall = {
            res : res ,
        }
    } catch (err){
        throw new Error(`jest is retarded :: ${err.message}`)
    }}


  it("api call test", () => {

   return call("/action/post").then((promiseResolve) => {
    // console.log(promiseResolve.res)
      expect(promiseResolve.res.statusCode).toBe(201);    
      expect(promiseResolve.res.type).toBe("application/json");
  
      expect(promiseResolve.res.body.message).toBe("post is added"); // this is with ligit cookie
      expect(promiseResolve.res.body.id).toBeTruthy();
      expect(promiseResolve.res.body.success).toBe(true);

      })
     
      // todo add more tests , and err handling tests
  });

  it('second test' , () =>{
      let x = 3 , y = 2 , t = '' 
      expect(x - y).toBe(1)
      expect(x + y).toBe(5)
      expect(t).toBeFalsy()
  })




});
afterAll( (done) => {
   db.close()
   .then(() => {
    done()
   })
});

//   res.status(201).json({
//     id : added._id , //todo: maybe remove
//   message : 'post is added' ,
//   success : true
//   })

//  .send({ message : "first working test"})

// MOCK : WORKING TEST TEMPLATE ::::

// const { db } = require('../config')

// const app = require('../server.js')
// const supertest = require('supertest')
// const request = supertest(app)

// beforeAll(done => {
//     done()
//   })

// describe('name your test wraper ' ,  () => {

//     test('name your test' , async () => {
//         try{
//          const res = await request.get('/testing')
//              expect(res.status).toBe(200) // or .not.
//         } catch(err){
//            console.log(err)
//         } finally {
//             return
//         }

//     })

// })

// afterAll(done => {
//     db.close()
//     done()
//   })
