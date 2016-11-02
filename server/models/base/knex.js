const knex = require('knex');
const config = require('../../config');

const environment = process.env.APP_ENV;
const db = knex(config[environment]);

module.exports = db;
