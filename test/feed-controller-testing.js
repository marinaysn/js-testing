const feedController = require('../controllers/feed');
const User = require('../models/user');
const Post = require('../models/post');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const connectionString = require('../util/database2')

describe('Feed controller', function () {

    before(function (done) {
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
            }).then(() => { done(); })
    })

    it('should return new Post', function (done) {

        const req = {
            body: {
                title: "Harry Potter",
                content: "A test post"
            },
            file: { path: 'newpathtothefile' },
            userId: '5c0f66b979af55031b34728a'
        };

        const res = {
            status: function () { return this }, json: function () { }
        }

        feedController.createPost(req, res, () => { })
            .then((savedUser) => {
                expect(savedUser).to.have.property('posts');
                expect(savedUser.posts).to.have.length(1);
                done();
            })
    })

    after(function (done) {
        User.deleteMany({}).then(() => {

            Post.deleteMany({}).then(() => {
                return mongoose.disconnect()
            }).then(() => {
                done();
            });

        })
    });
});
