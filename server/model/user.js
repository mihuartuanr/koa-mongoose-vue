const mongoose = require('../db/index');

const userSchema = mongoose.Schema({
  avatar: {
    type: String,
    select: false,
  },
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  alias: {
    type: String,
    select: false
  },
  telephone: {
    type: String,
    select: false
  },
  email: {
    type: String,
    select: false
  },
  department: {
    type: Array,
    select: false
  },
  job: {
    type: String,
    select: false
  },
  role: {
    type: String,
    select: false
  }
})

module.exports = mongoose.model('User', userSchema);
