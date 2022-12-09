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
    picture: {
        type: String
    }
});

const Food = model('Food', foodSchema);

module.exports = Food;