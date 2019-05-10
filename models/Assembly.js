const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assemblySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 64,
    },
    deleted: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('assemblies', assemblySchema);
