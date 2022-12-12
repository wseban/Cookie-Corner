const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    picture: {
        type: String
    }
});

const Food = model('food', foodSchema);

module.exports = Food;