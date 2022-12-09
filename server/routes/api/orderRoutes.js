const router = require('express').Router();
const {createOrder, changeOrder, deleteOrder} = require('../../controllers/orderControllers');

router.route('/').post(createOrder);

router.route('/:orderId').put(changeOrder).delete(deleteOrder);





module.exports = router;