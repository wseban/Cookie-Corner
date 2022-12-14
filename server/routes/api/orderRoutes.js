const router = require('express').Router();
const {getOrder, createOrder, changeOrder, deleteOrder, addCookie, getOneOrder} = require('../../controllers/orderControllers');
const { authMiddleware } = require('../../utils/auth');

router.route('/').get(authMiddleware, getOrder).post(authMiddleware, createOrder);

router.route('/:orderId').get( authMiddleware, getOneOrder).put( authMiddleware, changeOrder).delete( authMiddleware, deleteOrder);

router.route('/:orderId/cookie/:cookieId').post( authMiddleware, addCookie);



module.exports = router;