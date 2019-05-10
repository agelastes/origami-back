const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 128,
    },
    points: [{
        name: {
            type: String,
            required: true,
            maxlength: 128,
        },
    }],
    surveyType: {
       type: String,
       required: true,
       maxlength: 128,
    }
});

module.exports = mongoose.model('survey', surveySchema);
