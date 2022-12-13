const router = require('express').Router();
const { getAllQuantity, createQuantity, updateQuantity } = require('../../controllers/quantityControllers')

router.route('/').get(getAllQuantity).post(createQuantity);
router.route('/:quantityId').put(updateQuantity)


module.exports = router;