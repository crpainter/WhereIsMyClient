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
  db.createTable('user_donation', {
  id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true
},

  user_id: {
    type: 'int'
},

charity_id: {
    type: 'int'
},

DonationSum: {
  type: 'int'
},

project_id: {
  type: 'int'
},

}, done);
return null;
};

exports.down = function(db) {
  db.dropTable('user_donation')
  return null;
};

exports._meta = {
  "version": 1
};
