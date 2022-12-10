const router = require('express').Router();
const { getAllFood, createCookie } = require('../../controllers/foodController')

router.route('/').get(getAllFood).post(createCookie);


module.exports = router;