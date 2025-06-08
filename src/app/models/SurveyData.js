// models/SurveyData.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurveyDataSchema = new Schema({
    email: String,
    OrganizationName: String,
    data: Schema.Types.Mixed,
    status: String,
    error: {
        require: false,
        type: String,
        default: null
    },
}, { timestamps: true });

module.exports = mongoose.models.SurveyData || mongoose.model('SurveyData', SurveyDataSchema);
