const mongoose = require('mongoose');


var phoneModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image_url: {
        type: String,
        required: false
    },
    manufacturer: {
        type: String,
        required: true
    },
});



const PhoneModel = mongoose.model('PhoneModel', phoneModelSchema);

module.exports = {
    schema: phoneModelSchema,
    model: PhoneModel
}