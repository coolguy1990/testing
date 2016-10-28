var knex = require('knex'),
  config = require('../../config'),
  environment = process.env.APP_ENV,
  db = knex(config[environment]);

module.exports = db;
