const User = require('../users');
const baseBookshelf = require('../base');

let Users = {};

Users = baseBookshelf.Collection.extend({
  model: User,
});

module.exports = baseBookshelf.collection('Users', Users);
