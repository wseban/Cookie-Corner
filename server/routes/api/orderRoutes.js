const router = require('express').Router();
const {createOrder, changeOrder, deleteOrder} = require('../../controllers/thoughtsController');

router.route('/order').post(createOrder);

router.route('/order/:orderId').put(changeOrder).delete(deleteOrder);





module.exports = router;