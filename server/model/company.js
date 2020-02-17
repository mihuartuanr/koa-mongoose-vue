const mongoose = require('../db/index');

const contactsSchema = mongoose.Schema({
  alias: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});
const companySchema = mongoose.Schema({
  logo: String,
  company: {
    type: String,
    required: true
  },
  contacts: contactsSchema
})

module.exports = mongoose.model('Company', companySchema);
