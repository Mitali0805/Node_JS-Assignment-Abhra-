const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const faker = require('faker');
const userRoute = require('../User/routes/user')
const httpStatus = require('http-status')
const request = require('supertest');
const { logger } = require('../logger');
const mongoose = require('mongoose');
require('../sinon-mongoose');
const User = require('../User/model/user');
const UserController = require('../User/controller/user');


//Assertion Style
chai.should();

const expect = chai.expect;

chai.use(chaiHttp);

describe('GET USER', () =>{
   describe('GET/api/users',() =>{
        // it('should GET all users',(done) =>{
        //     chai.request('http://localhost:8000/api')
        //     .get('/users')
        //     .end((err,response) =>{
        //         response.should.have.status(200);
        //         response.body.should.be.a('Object');
        //         done();
        //     })
        // })

        it("should return all users", function(done){
          var UserMock = sinon.mock(User);
          var expectedResult = {status: true, user: []};
          UserMock.expects('find').yields(null, expectedResult);
          User.find((err,res)=>{
            UserMock.verify();
            UserMock.restore();
            expect(res.status).to.be.true;
            done();
          })
      });

      it("should not return all users", function(done){
        var UserMock = sinon.mock(User);
        var expectedResult = {status: false, error: "Something went wrong"};
        UserMock.expects('find').yields(expectedResult,null);
        User.find((err,res)=>{
          UserMock.verify();
          UserMock.restore();
          expect(err.status).to.not.be.true;
          done();
        })
    });

       it('should not GET all users',(done) =>{
            chai.request('http://localhost:8000/api')
            .get('/user')
            .end((err,response) =>{
                response.should.have.status(404);
                done();
            })
        })
   })

   describe('GET /api/user/:id',()=>{
       it('should GET the user by ID',(done)=>{
         chai.request('http://localhost:8000/api')
         .get('/user/6075e66f7a6e0368f4091f23')
         .end((err,response)=>{
             response.should.have.status(200);
             response.body.should.be.a('Object');
             done();
         })
       })

       it('should not GET the user by ID',(done)=>{
        chai.request('http://localhost:8000/api')
        .get('/user/6075e66f7a6e0368f4091f29')
        .end((err,response)=>{
            response.should.have.status(404);
            done();
        })
      })

      it('should not GET the user by ID as ID is Invalid',(done)=>{
        chai.request('http://localhost:8000/api')
        .get('/user/6075e66f7a6e0368f4091f2300')
        .end((err,response)=>{
            response.should.have.status(400);
            done();
        })
      })
   })

   describe('GET /api/users/:name',()=>{
    it('should GET the user by name',(done)=>{
      chai.request('http://localhost:8000/api')
      .get('/users/tina')
      .end((err,response)=>{
          response.should.have.status(200);
          response.should.be.a('Object');
          done();
      })
    })

    it('should not GET the user by name ',(done)=>{
     chai.request('http://localhost:8000/api')
     .get('/users/tinap0')
     .end((err,response)=>{
         response.should.have.status(404);
         done();
     })
   })

   it('should not GET the user by name as url is Invalid',(done)=>{
     chai.request('http://localhost:8000/api')
     .get('/users/tina/op')
     .end((err,response)=>{
         response.should.have.status(404);
         done();
     })
   })
 })
})

describe('POST api/user',()=>{
    it('should POST a new user',(done)=>{
        const user = {
          name:"Reena",
          lastname:"Raj",
          mobile:7057495627,
          email:"reena98110@mail.com",
          birthDate:"1996-09-29"
        };
        request('http://localhost:8000/api')
        .post('/user')
        .send(user)
        .then((response)=>{
            // response.should.have.status(201);
            // response.body.should.be.a('Object');
            expect(response.status).to.equal(201);
            expect(response.body.name).to.equal(user.name);
            user = response.body;
            done();
        })
        .catch(done());
    })

    //sinon
    it("should create new user", function(done){
      var UserMock = sinon.mock(new User({
        name:"Reema",
        lastname:"Raj",
        mobile:7057495627,
        email:"reema98110@mail.com",
        birthDate:"1996-09-29"
      }));
      var user = UserMock.object;
      var expectedResult = { status: true };
      UserMock.expects('save').yields(null, expectedResult);
      user.save(function (err, result) {
          UserMock.verify();
          UserMock.restore();
          expect(result.status).to.be.true;
          done();
      });
  });

  //sinon+faker
  // it('should add new user using faker sinon',async()=>{
  //   const stubValue = {
      // name: faker.name.findName(),
      // lastname: faker.name.lastName(),
      // mobile:faker.phone.phoneNumber(),
      // email: faker.internet.email(),
      // birthDate:faker.date.past()
  //   };
  //   const stub = sinon.stub(User,"create").returns(stubValue);

  // })

    it('should not POST a user with existing email',(done)=>{
        const user = {
          name:"Meena",
          lastname:"Raj",
          mobile:7057405627,
          email:"meena@mail.com",
          birthDate:"1996-09-23"
        };
        chai.request('http://localhost:8000/api')
        .post('/user')
        .send(user)
        .end((err,response)=>{
            response.should.have.status(400);
         })
        done();
    })
})

////////////////////////////

// "use strict";
// const chai = require('chai');
// const request = require('supertest');
// const expect = require('chai').expect;
// const chaiHttp = require('chai-http');

// const User = require('../User/model/user');
// chai.should();
// chai.use(chaiHttp);

// describe('api/users',()=>{
//     beforeEach(async() =>{
//         await User.deleteMany({});
//     })
// });

// describe('POST api/user', function() {
//    it('should create and return user', async function(){
//     const data = {
//                   name:"Mohit",
//                   lastname:"Raj",
//                   mobile:7057905627,
//                   email:"mohit@mail.com",
//                   birthDate:"1996-09-23"
//            };
//            await chai.request('http://localhost:8000/api').post('/user')
//                        .send(data)
//                        .end((err,response)=>{
//                         expect(response.status).to.equal(201);
//              })
        
       
//    })
// })

// describe("GET /user/:id",()=>{
//     // it('should return user if valid ID is passed',async()=>{
//     //            const user = new User({
//     //                           name:"Mohit",
//     //                           lastname:"Raj",
//     //                           mobile:7057905627,
//     //                           email:"mohit1@mail.com",
//     //                           birthDate:"1996-09-23"
//     //                    });
                 
//     //             let savedUser = await user.save();
//     //             const res = request('http://localhost:8000/api').get('/user/'+savedUser._id);
                
//     //             expect(res.status).to.equal(200);
//     // })

//     it("should return 400 error when invalid object id is provided", async ()=>{
//         const res = await request('http://localhost:8000/api').get("/user/1");
//         expect(res.status).to.equal(400);
//     })

//     it("should return 404 error when valid object id is provided but does not exist.", async ()=>{
//         const res = await request('http://localhost:8000/api').get("/user/6075e66f7a6e0368f4091f29");
//         expect(res.status).to.equal(404);
//     })
// })


///////////////////////
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const userRoute = require('../User/routes/user')
// const httpStatus = require('http-status')
// const request = require('supertest');
// const { logger } = require('../logger');
// const { response } = require('express');

// // const app = require('./')    //require app

// //Assertion Style
// chai.should();

// const expect = chai.expect();

// chai.use(chaiHttp);

// describe('GET USER', () =>{
//    describe('GET/api/users',() =>{
//         it('should GET all users',(done) =>{
//             chai.request('http://localhost:8000/api')
//             .get('/users')
//             .end((err,response) =>{
//                 response.should.have.status(200);
//                 response.body.should.be.a('Object');
//                 done();
//             })
//         })

//         it('should not GET all users',(done) =>{
//             chai.request('http://localhost:8000/api')
//             .get('/user')
//             .end((err,response) =>{
//                 response.should.have.status(404);
//                 done();
//             })
//         })
//    })

//    describe('GET /api/user/:id',()=>{
//        it('should GET the user by ID',(done)=>{
//          chai.request('http://localhost:8000/api')
//          .get('/user/6075e66f7a6e0368f4091f23')
//          .end((err,response)=>{
//              response.should.have.status(200);
//              response.body.should.be.a('Object');
//              done();
//          })
//        })

//        it('should not GET the user by ID',(done)=>{
//         chai.request('http://localhost:8000/api')
//         .get('/user/6075e66f7a6e0368f4091f29')
//         .end((err,response)=>{
//             response.should.have.status(404);
//             done();
//         })
//       })

//       it('should not GET the user by ID as ID is Invalid',(done)=>{
//         chai.request('http://localhost:8000/api')
//         .get('/user/6075e66f7a6e0368f4091f2300')
//         .end((err,response)=>{
//             response.should.have.status(400);
//             done();
//         })
//       })
//    })

//    describe('GET /api/users/:name',()=>{
//     it('should GET the user by name',(done)=>{
//       chai.request('http://localhost:8000/api')
//       .get('/users/tina')
//       .end((err,response)=>{
//           response.should.have.status(200);
//           response.should.be.a('Object');
//           done();
//       })
//     })

//     it('should not GET the user by name ',(done)=>{
//      chai.request('http://localhost:8000/api')
//      .get('/users/tinap0')
//      .end((err,response)=>{
//          response.should.have.status(404);
//          done();
//      })
//    })

//    it('should not GET the user by name as url is Invalid',(done)=>{
//      chai.request('http://localhost:8000/api')
//      .get('/users/tina/op')
//      .end((err,response)=>{
//          response.should.have.status(404);
//          done();
//      })
//    })
//  })
// })

// describe('User Management',()=>{
//       const user = {
//         name:"Reena",
//         lastname:"Raj",
//         mobile:7057495627,
//         email:"reena99399@mail.com",
//         birthDate:"1996-09-29"
//       };
//     it('should POST a new user',async()=>{        
//         await request('http://localhost:8000/api')
//               .post('/user')
//               .send(user)
//               .then((response)=>{
//             response.should.have.status(201);
//             // response.body.should.be.a('Object');
//             // expect(response.status).to.equal(201);
//             // expect(response.body.name).to.equal(user.name);
//             // user1 = response.body;  
//             // return response;          
//             // done();
//          })
//          let aBody = a.body;
//         // expect(aBody.status).to.equal(200);
//     })

//     it('should not POST a user with existing email',(done)=>{
//         chai.request('http://localhost:8000/api')
//         .post('/user')
//         .send(user)
//         .end((err,response)=>{
//             response.should.have.status(400);
//          })
//         done();
//     })

//     it('should not POST a user without email',()=>{
//       const user1 = {
//         name:"Reena",
//         lastname:"Raj",
//         mobile:7057495627,
//         birthDate:"1996-09-29"
//       };
//        chai.request('http://localhost:8000/api')
//       .post('/user')
//       .send(user1)
//       .then(response =>{
//         response.should.have.status(400);
//       })
//       .catch(err =>{
//         console.log(err);
//       })
//   })
// })
