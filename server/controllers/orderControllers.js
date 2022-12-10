const { User, Food, Order } = require("../models");

module.exports = {
    getOrder(req, res){
        Order.find()
        .select('-__v')
        .then((orderData) => {
            res.json(orderData);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    createOrder(req, res){
        Order.create(req.body)
        .then(orderData => res.json(orderData))
        .catch((err) => res.status(500).json(err));
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