const _ = require('lodash');
const db = require('./knex');
const uuid = require('node-uuid');
const moment = require('moment');
const bookshelf = require('bookshelf');

let baseBookshelf = {};

baseBookshelf = bookshelf(db);
baseBookshelf.plugin('registry');
baseBookshelf.plugin('virtuals');
baseBookshelf.plugin('visibility');

// Base Model
baseBookshelf.Model = baseBookshelf.Model.extend({
  hasTimestamps: true,

  // default value setup for each model
  defaults: function defaults() {
    return {
      uuid: uuid.v4(),
    };
  },

  // When loading an instance, default values to fetch
  defaultColumnsToFetch: function defaultColumnsToFetch() {
    return [];
  },

  // fix dates before saving to db
  fixDatesWhenSave: function fixDates(attrs) {
    _.each(attrs, (value, key) => {
      if (value !== null && (key === 'updated_at' || key === 'created_at')) {
        attrs[key] = moment(value).format('YYYY-MM-DD HH:mm:ss');
      }
    });

    return attrs;
  },

  // fix dates when fetching
  fixDatesWhenFetch: function fixDates(attrs) {
    _.each(attrs, (value, key) => {
      if (value !== null && (key === 'updated_at' || key === 'created_at')) {
        attrs[key] = moment(value).toDate();
      }
    });

    return attrs;
  },

  // format date before writing
  format: function format(attrs) {
    return this.fixDatesWhenSave(attrs);
  },

  // format date before reading
  parse: function parse(attrs) {
    return this.fixDatesWhenFetch(attrs);
  },

  // get updated attributes before .save or .call
  updatedAttributes: function updatedAttributes() {
    return this._updatedAttributes || {};
  },

  // get specific updated value
  updated: function updated(attr) {
    return this.updatedAttributes(attr);
  },

  hasDateChanged(attr) {
    return moment(this.get(attr)).diff(moment(this.updated(attr))) !== 0;
  },
});

module.exports = baseBookshelf;
module.exports.db = db;
