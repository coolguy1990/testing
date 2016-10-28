var User = require('../users'),
  baseBookshelf = require('../base'),
  Users;

Users = baseBookshelf.Collection.extend({
  model: User
});

module.exports = baseBookshelf.collection('Users', Users);
