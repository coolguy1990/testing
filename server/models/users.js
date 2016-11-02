const baseBookshelf = require('./base');

let User = {};

User = baseBookshelf.Model.extend({
  tableName: 'users',

  hidden: ['password'],

  modules() {
    return this.hasMany('Modules');
  },

  systems() {
    return this.hasMany('Systems');
  },
});

module.exports = baseBookshelf.model('User', User);
