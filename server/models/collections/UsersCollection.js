/* eslint-disable one-var */
const User = require('../users'),
  baseBookshelf = require('../base');
/* eslint-enable one-var */
let Users = {};

Users = baseBookshelf.Collection.extend({
  model: User
});

module.exports = baseBookshelf.collection('Users', Users);
