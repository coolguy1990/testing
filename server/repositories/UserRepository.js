/* eslint-disable one-var */
const User = require('../models/users'),
  Users = require('../models/collections/UsersCollection'),
  bcrypt = require('bcryptjs'),
  Promise = require('bluebird');
/* eslint-enable one-var */

module.exports = {
  // get all users
  getAllUsers: function getAllUsers() {
    return Users.forge()
      .fetch();
  },

  createUser: function createUser(obj) {
    const self = this;

    return new Promise(function (resolve, reject) {
      self.checkUserExists(obj.email)
        .then(function (data) {
          if (data.status) {
            reject(new Error('User already exists'));
          } else {
            new User({
              name: obj.name,
              email: obj.email,
              password: bcrypt.hashSync(obj.password, process.env.APP_SECRET)
            })
            .save()
            .then(function (user) {
              resolve(user.attributes);
            })
            .catch(reject);
          }
        })
        .catch(reject);
    });
  },

  checkUserExists: function checkUserExists(email) {
    return new Promise(function (resolve, reject) {
      /* eslint-disable no-unused-vars */
      const user = new User({
      /* eslint-enable no-unused-vars */
        email
      })
      .orderBy('created_at', 'DESC')
      .fetch({
        require: true
      })
      .then(function (savedUser) {
        let status = false;

        if (savedUser.attributes) {
          status = true;
        }
        resolve({
          status,
          user: savedUser.attributes
        });
      })
      .catch(User.NotFoundError, function (err) {
        resolve({
          status: false,
          user: null,
          message: err
        });
      })
      .catch(TypeError, reject);
    });
  },

  // update user
  updateUser: function updateUser(userId, obj, callback) {
    return User.forge({
      id: userId
    })
    .fetch({
      require: true
    })
    .then(function (user) {
      callback(
        user.save({
          name: obj.name || user.get('name'),
          email: obj.email || user.get('email')
        })
      );
    });
  },

  // delete user
  deleteUser: function deleteUser(userId, callback) {
    return User.forge({
      id: userId
    })
    .fetch({
      require: true
    })
    .then(function (user) {
      callback(
        user.destroy()
      );
    });
  },

  // get user
  getUserById: function getUserById(userId) {
    return User.forge({
      id: userId
    })
    .fetch();
  },

  // get user by email
  getUserByEmail: function getUserByEmail(email) {
    return User.forge()
      .query({
        where: {
          email
        }
      })
      .orderBy('created_at', 'DESC')
      .fetch();
  }
};
