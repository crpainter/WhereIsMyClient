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

exports.up = function(db, done) {
  db.createTable('charity_project', {
  id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true
},

charity_id: {
  type: 'int'
},

  name: {
    type: 'string'
},

budget: {
  type: 'int'
},

}, done);
return null;
};

exports.down = function(db) {
  db.dropTable('charity_project')
  return null;
};

exports._meta = {
  "version": 1
};
