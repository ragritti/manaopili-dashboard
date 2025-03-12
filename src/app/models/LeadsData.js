const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeadsDataSchema = new Schema({
  email: String,
  OrganizationName: String
},{
  timestamps: true
});

module.exports = mongoose.models.LeadsData ||mongoose.model('LeadsData', LeadsDataSchema);