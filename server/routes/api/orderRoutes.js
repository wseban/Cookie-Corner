const router = require('express').Router();
const {getOrder, createOrder, changeOrder, deleteOrder} = require('../../controllers/orderControllers');

router.route('/').get(getOrder).post(createOrder);

router.route('/:orderId').put(changeOrder).delete(deleteOrder);





module.exports = router;