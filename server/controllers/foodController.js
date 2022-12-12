const { Food } = require('../models');

module.exports = {
    async getAllFood(req, res) {
        const allFood = await Food.find();

        if (!allFood) {
            return res.status(400).json({ message: 'There are no cookies' })
        }
        res.status(200).json(allFood);
    },

    async getSingleFood(req, res) {
        try {
            const food = await Food.findOne({ _id: req.params.foodId });
            food ?
                res.json(food) :
                res.status(400).json({ message: 'No food found' });
            return;
        } catch (err) {
            res.json(err);
        }
    },

    createCookie(req, res) {
        Food.create(req.body)
            .then(cookieData => res.json(cookieData))
            .catch((err) => res.status(500).json(err));
    }
}