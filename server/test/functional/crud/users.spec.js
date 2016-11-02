const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../app');
/* eslint-disable no-unused-vars */
const should = chai.should();
/* eslint-enable no-unused-vars */
const User = require('../../../models/users');
const db = require('../../../models/base/knex');

chai.use(chaiHttp);

describe('Users', () => {
  beforeEach((done) => {
    db.migrate.rollback()
    .then(() => {
      db.migrate.latest()
      .then(() => {
        new User({
          name: 'Kunal',
          email: 'mangaraj.kunal@gmail.coms',
          password: 'testing',
        })
        .save()
        /* eslint-disable no-unused-vars */
        .then((user) => {
        /* eslint-enable no-unused-vars */
          done();
        });
      });
    });
  });

  afterEach((done) => {
    db.migrate.rollback()
    .then(() => {
      done();
    });
  });

  it('should list All users on /api/users GET', (done) => {
    chai.request(server)
    .get('/api/users')
    .end((err, res) => {
      if (err) {
        done(err);
      }
      res.should.have.status(200);
      res.body.should.have.property('error');
      res.body.error.should.equal(false);
      done();
    });
  });

  it('should list a single user on  /api/users/:id GET', (done) => {
    /* eslint-disable no-unused-vars */
    const newUser = new User({
    /* eslint-enable no-unused-vars */
      name: 'Kunal',
      email: 'mangaraj.kunal@gmail.coms',
      password: 'testing',
    })
    .save()
    .then((user) => {
      chai.request(server)
      .get(`/api/users/${user.get('id')}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.id.should.equal(user.get('id'));
        res.body.error.should.equal(false);
        done();
      });
    });
  });

  it('should add a single user on /api/users POST', (done) => {
    chai.request(server)
    .post('/api/users')
    .send({
      name: 'Test User',
      email: 'foo@bar.com',
      password: 'fubar',
    })
    .end((err, res) => {
      if (err) {
        done(err);
      }
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.error.should.equal(false);
      res.body.data.should.have.property('id');
      done();
    });
  });
  it('should update a single user on /api/users/:id PUT', (done) => {
    chai.request(server)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'foo@bar.com',
        password: 'fubar',
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        chai.request(server)
          .put(`/api/users/${res.body.data.id}`)
          .send({
            name: 'Cookie',
          })
          .end((error, response) => {
            if (error) {
              done(error);
            }
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.error.should.equal(false);
            response.body.data.message.should.equal('User details updated');
            done();
          });
      });
  });

  it('should delete a single user on /api/users/:id DELETE', (done) => {
    chai.request(server)
      .post('/api/users')
      .send({
        name: 'Test User',
        email: 'foo@bar.com',
        password: 'fubar',
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        chai.request(server)
          .delete(`/api/users/${res.body.data.id}`)
          .end((error, response) => {
            if (error) {
              done(error);
            }
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.error.should.equal(false);
            response.body.data.message.should.equal('User successfully deleted');
            done();
          });
      });
  });
});
