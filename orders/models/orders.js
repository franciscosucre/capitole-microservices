const mongoose = require('mongoose');

/* We define the database schema */
var orderSchema = new mongoose.Schema({
    client: {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }

    },
    phones: [{
        model: {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            image_url: {
                type: String,
                required: true
            },
            manufacturer: {
                type: String,
                required: true
            }
        },
        price: {
            type: Number,
            required: true
        },
        sold: {
            type: Boolean,
            default: false
        }
    }],
    total: {
        type: Number,
        required: true
    },
});
/* We create the model */
const Order = mongoose.model('Order', orderSchema);

module.exports = {
    schema: orderSchema,
    model: Order
}