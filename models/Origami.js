const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const origamiSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 128,
    },
    mainImage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1024,
    },
    images: [{
        type: String,
    }],
    userId: {
        ref: 'users',
        type: Schema.Types.ObjectId,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: String,
        default: "Аноним"
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model('origami', origamiSchema);
