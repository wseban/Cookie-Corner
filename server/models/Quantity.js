const { Schema, model } = require('mongoose');

const quantitySchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    foodId: {
        type: Schema.Types.ObjectId,
        ref: "food",
    },
});

const Quantity = model('quantity', quantitySchema);

module.exports = Quantity; 