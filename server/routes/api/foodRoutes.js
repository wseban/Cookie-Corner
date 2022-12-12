const router = require('express').Router();
const { getAllFood, createCookie, getSingleFood } = require('../../controllers/foodController')

router.route('/').get(getAllFood).post(createCookie);
router.route('/:foodId').get(getSingleFood)


module.exports = router;