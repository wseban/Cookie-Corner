const router = require('express').Router();
const { getAllFood } = require('../../controllers/foodController')

router.route('/').get(getAllFood);

module.exports = router;