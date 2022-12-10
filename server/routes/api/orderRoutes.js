const router = require('express').Router();
const {getOrder, createOrder, changeOrder, deleteOrder, addCookie, getOneOrder} = require('../../controllers/orderControllers');

router.route('/').get(getOrder).post(createOrder);

router.route('/:orderId').get(getOneOrder).put(changeOrder).delete(deleteOrder);

router.route('/:orderId/cookie/:cookieId').post(addCookie)





module.exports = router;