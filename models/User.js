const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    role: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model('users', userSchema);
