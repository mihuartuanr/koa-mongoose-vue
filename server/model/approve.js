const mongoose = require('../db/index');

const Schema = mongoose.Schema;
const fieldsSchema = Schema({

});
const workflowSchema = Schema({

});
const approvalSchema = Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    select: false
  },
  status: {
    type: Boolean,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createtime: {
    type: Number,
    required: true,
    select: false,
  },
  modifier: {
    type: Schema.Types.ObjectId,
    required: true
  },
  latesttime: {
    type: Number,
    required: true
  },
  fields: fieldsSchema,
  workflow: workflowSchema
})

module.exports = mongoose.model('Approve', approvalSchema);
