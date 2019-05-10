const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
        maxlength: 512,
    },
    date: {
        type: Number,
        required: true,
    },
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    },
    origamiId: {
        ref: 'origami',
        type: Schema.Types.ObjectId,
    },
    author: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('comments', commentSchema);
