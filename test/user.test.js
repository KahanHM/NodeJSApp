const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../models/user');

chai.should();
chai.use(chaiHttp);

describe('Users API', () => {
  before((done) => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.error('Failed to connect to MongoDB', err);
      });
  });

  after((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });

  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('POST /users', () => {
    it('should create a new user', (done) => {
      const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30
      };

      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('John Doe');
          res.body.should.have.property('email').eql('john.doe@example.com');
          res.body.should.have.property('age').eql(30);
          done();
        });
    });
  });

  describe('GET /users', () => {
    it('should get all users', (done) => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});