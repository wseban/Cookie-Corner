const { Quantity, Order } = require('../models');

module.exports = {
  async getAllQuantity(req, res) {
    const allQuantity = await Quantity.find();

    if (!allQuantity) {
      return res.status(400).json({ message: 'There are no cookies' })
    }
    res.status(200).json(allFood);
  },

  async createQuantity(req, res) {
    try {
      const newQuantity = await Quantity.create(req.body);

      const updatedOrder = await Order.findOneAndUpdate(
        { _id: req.body.orderId },
        { $addToSet: { quantity: newQuantity._id } },
        { new: true, runValidators: true }
      );
      return res.json(updatedOrder);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async updateQuantity(req, res){
    try {
        const quantityData = await Quantity.findOneAndUpdate(
            { _id: req.params.quantityId },
            {$set: req.body},
            { runValidators: true, new: true }
            );   
        if (!quantityData) {
            return res.status(404).json({ message: 'Quantity not updated' });
        } else {
            return res.json(quantityData);
        }
    } catch(err){ 
        res.status(500).json(err)
    };   
},

}