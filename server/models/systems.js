const { bookshelf, TABLES } = require('../db.js');

require('./Users');
const Systems = bookshelf.Model.extend({
  tableName: TABLES.SYSTEMS,
  user() {
    return this.belongsTo(TABLES.USERS);
  }
  // systemTypes: function () {
  //   return this.belongsTo(TABLES.SYSTEM_TYPES)
  // }
});

module.exports = bookshelf.model(TABLES.SYSTEMS, Systems);
