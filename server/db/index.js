const mongoose = require('mongoose');
const DB = require('../config/db');

const { port, host, database } = DB;
const DB_URL = `mongodb://${host}:${port}/${database}`;
const db = mongoose.connect(DB_URL);

db.on('connected', function() {
  console.log(`Mongoose connection open to ${DB_URL}`)
})
db.on('error', function(err){
  console.log(`Mongoose connection error: ${err}`)
})
db.on('disconnected', function() {
  console.log('Mongoose connection disconnected')
})

module.exports = mongoose;
