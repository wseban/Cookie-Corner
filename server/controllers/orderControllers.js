const { User, Food, Order } = require("../models");

module.exports = {
    async getOrder(req, res){
        try {
            console.log('in getOrder');
            const orderData = await Order.find({});
            if(!orderData) {
                console.log('did not get orderData');
                res.status(400).json({message: 'orders not found'});
            } else {
                console.log('orderData');
                res.json(orderData);
            }
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
    },
    async createOrder(req, res){
        try {
            console.log('in createOrder');

            const newOrder = await Order.create(req.body);
            console.log('created order', JSON.stringify(newOrder));

            const updatedUser = await User.findOneAndUpdate(
              { _id: req.user._id },
              { $addToSet: { orders: newOrder._id } },
              { new: true, runValidators: true }
            );
            console.log('updatedUser' + JSON.stringify(updatedUser));
            return res.json(newOrder);
          } catch (err) {
            console.log(err);
            return res.status(400).json(err);
          }
    },

    async changeOrder(req, res){
        try {
            console.log('in changeOrder');
            const orderData = await Order.findOneAndUpdate(
                { _id: req.params.orderId },
                {$set: req.body},
                { runValidators: true, new: true }
                );
            console.log('after find and update');    
            if (!orderData) {
                console.log('error updating order');
                return res.status(404).json({ message: 'Order not updated' });
            } else {
                console.log('order updated');
                return res.json(orderData);
            }
        } catch(err){ 
            res.status(500).json(err)
        };   
    },

    async deleteOrder(req, res){
        try {
            console.log('in deleteOrder');

            const orderData = await Order.findOneAndDelete(
                { _id: req.params.orderId }
                );
            if (!orderData) {
            res.status(404).json({ message: 'No order found' })
            } else {
                res.json(orderData);
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
            .populate("food")
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