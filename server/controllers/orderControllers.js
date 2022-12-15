const { User, Food, Order } = require("../models");

module.exports = {
    async getOrder(req, res){
        try {
            const orderData = await Order.find({});
            if(!orderData) {
                return res.status(400).json({message: 'orders not found'});
            } else {
                return res.json(orderData);
            }
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
    },
    async createOrder(req, res){
        try {
            const newOrder = await Order.create(req.body);
            const updatedUser = await User.findOneAndUpdate(
              { _id: req.user._id },
              { $addToSet: { orders: newOrder._id } },
              { new: true, runValidators: true }
            );
            return res.json(newOrder);
          } catch (err) {
            console.log(err);
            return res.status(400).json(err);
          }
    },

    async changeOrder(req, res){
        try {
            const orderData = await Order.findOneAndUpdate(
                { _id: req.params.orderId },
                {$set: req.body},
                { runValidators: true, new: true }
                );
            if (!orderData) {
                return res.status(404).json({ message: 'Order not updated' });
            } else {
                return res.json(orderData);
            }
        } catch(err){ 
            res.status(500).json(err)
        };   
    },

    async deleteOrder(req, res){
        try {
            const orderData = await Order.findOneAndRemove(
                { _id: req.params.orderId }
                );
            if (!orderData) {
                return res.status(404).json({ message: 'No order found' });
            } else {
                const userData = await User.findOneAndUpdate(
                    { _id: req.user._id || req.body.userId },
                    { $pull: { orders: orderData._id } },
                    { new: true, runValidators: true }
                );
                return res.json(orderData);
            }
        } catch(err) {
            res.status(500).json(err)
        };
    },

    addCookie(req, res){
            Order.findOneAndUpdate(
                { _id: req.params.orderId },
                { $addToSet: { food: req.body } },
                { runValidators: true, new: true })

                .then((orderData) =>
                !orderData
                    ? res
                        .status(404)
                        .json({ message: 'No order found' })
                    : res.json(orderData)
            )
            .catch((err) => res.status(500).json(err));
    },
    getOneOrder(req, res) {
        Order.findOne({ _id: req.params.orderId })
            .select('-__v')
            .populate({ 
                path: 'food',
                populate: {
                  path: 'foodId',
                  model: 'food'
                } 
             })
            .then((orderData) =>
                !orderData
                    ? res.status(404).json({ message: 'No order found' })
                    : res.json({
                        orderData,
                        message: "Order Found",
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
};