const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
    {
        orderName: {
            type: String,
            required: true,
            trimmed: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        deliveryDate: {
            type: Date,
            default: Date.now,
        },
        food: [
            {
                foodId: {
                    type: Schema.Types.ObjectId,
                    ref: "food",
                },
                quantity: {
                    type: Number
                }
            },
            
        ],
/*        
        quantity: [
            {
                type: Schema.Types.ObjectId,
                ref: "quantity",
            },
        ],
        */
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

const Order = model('order', orderSchema);

module.exports = Order;