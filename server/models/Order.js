const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        food: [
            {
                type: Schema.Types.ObjectId,
                ref: "food",
            },
        ],
    },
    {
        toJSON: {
            getters: true,
        },
    }
);
orderSchema.virtual("foodCount").get(function () {
    return this.food.length;
})

const Order = model('orders', orderSchema);

module.exports = Order;