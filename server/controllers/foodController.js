const { Food } = require('../models');

module.exports = {
    async getAllFood(req, res) {
        const allFood = await Food.find();

        if(!allFood){
            return res.status(400).json({message: 'There are no cookies'})
        }
        res.status(200).json(allFood);
    },

    createCookie(req, res){
        Food.create(req.body)
        .then(cookieData => res.json(cookieData))
        .catch((err) => res.status(500).json(err));
    }
}