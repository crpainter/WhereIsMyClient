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
  db.createTable('payment_method', {
  id: {
    type: 'int',
    primaryKey: true,
    autoIncrement: true
},

  user_id: {
    type: 'int'
},

expiry: {
    type: 'string',
    length: 40
},

cardNumber: {
  type: 'string',
  length: 40
},

bankId: {
  type: 'int'
},

}, done);
return null;
};

exports.down = function(db) {
  db.dropTable('payment_method')
  return null;
};

exports._meta = {
  "version": 1
};
