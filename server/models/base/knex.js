/* eslint-disable one-var */
const knex = require('knex'),
  config = require('../../config'),
  environment = process.env.APP_ENV,
  db = knex(config[environment]);
/* eslint-enable one-var */

module.exports = db;
