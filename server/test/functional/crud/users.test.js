var chai = require('chai'),
chaiHttp = require('chai-http'),
server = require('../../../app'),
should = chai.should(),
User = require('../../../models/users'),
db = require('../../../models/base/knex');

chai.use(chaiHttp);

describe('Users', function() {

  beforeEach(function(done) {
    db.migrate.rollback()
    .then(function() {
      db.migrate.latest()
      .then(function() {
        new User({
          name: 'Kunal',
          email: 'mangaraj.kunal@gmail.coms',
          password: 'testing'
        })
        .save()
        .then(function(user) {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    db.migrate.rollback()
    .then(function() {
      done();
    });
  });

  it('should list All users on /api/users GET', function (done) {
    chai.request(server)
    .get('/api/users')
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.have.property('error');
      res.body.error.should.equal(false);
      done();
    });
  });

  it('should list a single user on  /api/users/:id GET', function (done) {
    var newUser = new User({
      name: 'Kunal',
      email: 'mangaraj.kunal@gmail.coms',
      password: 'testing'
    })
    .save()
    .then(function(user) {
      chai.request(server)
      .get('/api/users/'+ user.get('id'))
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.id.should.equal(user.get('id'));
        res.body.error.should.equal(false);
        done();
      });
    });
  });

  it('should add a single user on /api/users POST', function (done) {
    chai.request(server)
    .post('/api/users')
    .send({
      name: 'Test User',
      email: 'foo@bar.com',
      password: 'fubar'
    })
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.error.should.equal(false);
      res.body.data.should.have.property('id');
      done();
    });
  });
  it('should update a single user on /api/users/:id PUT', function (done) {
    chai.request(server)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'foo@bar.com',
        password: 'fubar'
      })
      .end(function(err, res) {
        chai.request(server)
          .put('/api/users/'+res.body.data.id)
          .send({
            name: 'Cookie'
          })
          .end(function(err, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.error.should.equal(false);
            response.body.data.message.should.equal('User details updated');
            done();
          });
      });
  });

  it('should delete a single user on /api/users/:id DELETE', function(done) {
    chai.request(server)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'foo@bar.com',
        password: 'fubar'
      })
      .end(function(err, res) {
        chai.request(server)
          .delete('/api/users/'+res.body.data.id)
          .end(function(err, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.error.should.equal(false);
            response.body.data.message.should.equal('User successfully deleted');
            done();
          });
      });
  });
});
