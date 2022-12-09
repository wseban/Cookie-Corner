const { User, Food, Order } = require("../models");

module.exports = {
    createOrder(req, res){
        Order.create(req.body)
        .then(orderData => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {order: orderData._id}},
                {new: true}
            );
        })
    },

    changeOrder(req, res){
        Order.findOneAndUpdate(
            { _id: req.params.orderId },
            {$set: req.body},
            { runValidators: true, new: true }
        )
            .then((orderData) =>
                !orderData
                    ? res
                        .status(404)
                        .json({ message: 'No thought found' })
                    : res.json(orderData)
            )
            .catch((err) => res.status(500).json(err));

    },

    deleteOrder(req, res){
        Order.findOneAndRemove(
            { _id: req.params.orderId }
        )
        .then((orderData) =>
        !orderData
            ? res
                .status(404)
                .json({ message: 'No order found' })
            : res.json(orderData)
    )
            .catch((err) => res.status(500).json(err));
    }
};