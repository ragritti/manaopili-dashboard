const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactLeadsDataSchema = new Schema({
  email: String,
  name: String,
  message:String,
  company:String
},{
  timestamps: true
});

module.exports = mongoose.models.ContactLeads ||mongoose.model('ContactLeads', ContactLeadsDataSchema);