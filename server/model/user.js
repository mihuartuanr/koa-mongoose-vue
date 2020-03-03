const mongoose = require('../db/index');

const Schema = mongoose.Schema;
const userSchema = Schema({
  __v: {
    select: false
  },
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
  },
  approves: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Approve'
    }
  ]
})

module.exports = mongoose.model('User', userSchema);
