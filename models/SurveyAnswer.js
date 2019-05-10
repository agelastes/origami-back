const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveyAnswerSchema = new Schema({
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    },
    surveyId: {
        ref: 'survey',
        type: Schema.Types.ObjectId,
    },
    pointId: {
        type: Schema.Types.ObjectId,
    },
    value: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model('surveyAnswer', surveyAnswerSchema);
