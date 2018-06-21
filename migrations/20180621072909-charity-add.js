'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

//added new columns
exports.up = function(db, callback) {
  db.addColumn(
    'charity', 'featuredimage1', { type: 'string' }, callback), 
  db.addColumn(
    'charity', 'featuredimage2', { type: 'string' }, callback), 
  db.addColumn(
    'charity', 'featuredimage3', { type: 'string' }, callback), 
  db.addColumn(
    'charity', 'cause', { type: 'string' }, callback)
};

exports.down = function(db) {
  db.dropTable('charity')
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};

//adding to testing
