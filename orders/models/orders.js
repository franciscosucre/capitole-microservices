const mongoose = require('mongoose');

var phoneSchema = new mongoose.Schema({
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
