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

// describe('UserController',()=>{
//     describe("addUser",()=>{
//       let status ,json, res, userController;
//         beforeEach(() => {
//         status = sinon.stub();
//         json = sinon.spy();
//         res = { json, status };
//         status.returns(res);      
//         });

//         it("should add user", async() =>{
//             const req = {
//                 body: {                    
//                         name: faker.name.findName(),
//                         lastname: faker.name.lastName(),
//                         mobile:faker.phone.phoneNumber(),
//                         email: faker.internet.email(),
//                         birthDate:faker.date.past()                    
//                 }
//               };
            // const stubValue = {
            //     name: faker.name.findName(),
            //     lastname: faker.name.lastName(),
            //     mobile:faker.phone.phoneNumber(),
            //     email: faker.internet.email(),
            //     birthDate:faker.date.past()
            // };
//             const stub = sinon.stub(User,"create").returns(stubValue);
//             await UserController.addUser(req,res);
//             expect(stub.calledOnce).to.be.true;
//             expect(status.calledOnce).to.be.true;
            
//           });
//         });
//     });

// describe('UserController',()=>{
    // const stubValue = {
    //     name: faker.name.findName(),
    //     lastname: faker.name.lastName(),
    //     mobile:faker.phone.phoneNumber(),
    //     email: faker.internet.email(),
    //     birthDate:faker.date.past()
    // };

//     describe("getUsers",()=> {
//         it("should retrieve all users ", async()=> {
//           const stub = sinon.stub(User, "find").returns(stubValue);
//           const user = await UserController.getAllUsers();
//           expect(stub.calledOnce).to.be.true;
//           expect(user.name).to.equal(stubValue.name);
//         });
//       });
// })


// describe("UserRepository", function() {
//     const stubValue = {
//         name: faker.name.findName(),
//         lastname: faker.name.lastName(),
//         mobile:faker.phone.phoneNumber(),
//         email: faker.internet.email(),
//         birthDate:faker.date.past()
//     };
//      describe("getUser", function() {
//       it("should retrieve a user with specific id", async function() {
//         const stub = sinon.stub(User, "findById").withArgs({_id:stubValue.params.id}).returns(stubValue);
        
//         // const user = await UserController.getUserById
//         expect(stub.calledOnce).to.be.true;
        
//       });
//     });
//   });

describe("userController",()=>{
    it('should check a function', () => {
        // var UserMock = sinon.mock(UserController);       
        // const stub = sinon.stub(UserController, "getAllUsers")
        // console.log("Hello",stub);
        expect(UserController.getAllUsers).to.be.a('Function');
      })
})

describe('UserController',()=>{
        describe("addUser",()=>{
          let status ,json, res, userController;
            beforeEach(() => {
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);   
            const userRepo = sinon.spy();   
        });
    
        it("should add user", async() =>{
                        const req = {
                            body: {                    
                                    name: faker.name.findName(),
                                    lastname: faker.name.lastName(),
                                    mobile:7057905627,
                                    email: faker.internet.email(),
                                    birthDate:faker.date.past()                    
                            }
                          };
                          const stubValue = {
                            name: faker.name.findName(),
                            lastname: faker.name.lastName(),
                            mobile:7057905627,
                            email: faker.internet.email(),
                            birthDate:faker.date.past()
                        };
                         const stub = sinon.stub(User,"create").returns(stubValue);                     
                         await UserController.addUser(req,res);
                        //  expect(stub.calledOnce).to.be.true;
                        //  expect(stub.callCount).to.equal(0);
                        expect(status.calledOnce).to.be.true;
                        expect(json.calledOnce).to.be.true;
                        expect(UserController.addUser).to.be.a('Function');
                                      
                        
                      });
            });


            describe("getUsers", function() {
                let req;
                let res,json,status;
                beforeEach(() => {
                    status = sinon.stub();
                    res = { json,status };
                  const userRepo = sinon.spy();                 
                });
                it("should return all users", async function() {
                    const stubValue = {
                        name: faker.name.findName(),
                        lastname: faker.name.lastName(),
                        mobile:faker.phone.phoneNumber(),
                        email: faker.internet.email(),
                        birthDate:faker.date.past()
                    };
                  const mock = sinon.mock(res);
                  const stub = sinon.stub(User, "find").returns(stubValue);
                   await UserController.getAllUsers(req, res);
                  expect(stub.calledOnce).to.be.true;
                  expect(status.calledOnce).to.be.true;
                //   expect(json.calledOnce).to.be.true;
                  mock.verify();
                });
              });
        });
    