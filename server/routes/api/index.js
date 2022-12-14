const router = require('express').Router();
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');
const foodRoutes = require('./foodRoutes');

router.use('/users', userRoutes);
router.use('/order', orderRoutes);
router.use('/cookies', foodRoutes);

module.exports = router;