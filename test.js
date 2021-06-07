var supertest = require("supertest");
var should = require("should");
// "test": "jest --env=node"
// This agent refers to PORT where program is runninng.
//"test": "node test.js",
var server = supertest.agent("http://localhost:3000");
// "test": "node ./node_modules/mocha/bin/mocha"
// UNIT test begin

describe("test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    
    });
  });
});
