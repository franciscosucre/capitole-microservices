const mongoose = require('mongoose');

var phoneSchema = new mongoose.Schema({
    model: {
        name: {
            type: String,
            required:true
        },
        description: {
            type: String,
            required:true
        },
        image_url: {
            type: String,
            required:true
        },
        manufacturer:{
            type: String,
            required:true
        }
    },
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
