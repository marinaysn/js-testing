const authController = require('../controllers/auth');
const User = require('../models/user');

const expect = require('chai').expect;
const sinon = require('sinon');

const mongoose = require('mongoose');
const connectionString = require('../util/database2')

describe('Auth controller', function () {

    before(function(done) {
        mongoose
        .connect(
          connectionString, { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(result => {
          console.log('Connected to Playground');
          const user = new User({
              email: 'dina123@test.ca',
              password: '123465123',
              name: 'Tester',
              posts: [],
              _id: '5c0f66b979af55031b34728a'
          })

          return user.save();
        }) .then(()=>{ done();})
    })
    

    describe('Login', function () {

        it('return error code should be 500 if database cannot be accessed', function (done) {

            sinon.stub(User, 'findOne');
            User.findOne.throws();

            const req = {
                body: {
                    email: 'marinaysn@gmail.com',
                    password: '123123'
                }
            };

            authController.login(req, {}, ()=>{}).then(result =>{
                expect(result).to.be.an('error')
                expect(result).to.have.property('statusCode', 500);
                done();
            });
           // expect(authController.login)
            User.findOne.restore();
        })
    });

    describe('UserStatus', function() {
        it('should return valid status for the existing User', function(done){
            
                const req = {
                    userId: '5c0f66b979af55031b34728a'
                }; 
                const res ={
                    statusCode: 500,
                    userStatus: null,
                    status: function(code){
                        this.statusCode = code;
                        return this;
                    },
                    json: function(data){
                        this.userStatus = data.status
                    }
                };
                authController.getUserStatus(req, res, ()=>{})
                .then(()=>{
                    expect(res.statusCode).to.be.equal(200);
                    expect(res.userStatus).to.be.equal('I am new!');
                   done();
                })
        })

    });

    after( function(done){
        User.deleteMany({}).then(()=>{
            return mongoose.disconnect()
        }).then(()=>{
            done();  
        });  
    })

});



