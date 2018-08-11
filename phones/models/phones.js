const mongoose = require('mongoose');
const phoneModelSchema = require('../models/phoneModel').schema;

var phoneSchema = new mongoose.Schema({
    model: phoneModelSchema,
    price: {
        type: Number,
        required:true
    },
    sold: {
        type: Boolean,
        default: false
    }
});

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = {
    schema: phoneSchema,
    model: Phone
}
