const router = require('express').Router();
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');
const foodRoutes = require('./foodRoutes');
const quantityRoutes = require('./quantityRoutes');

router.use('/users', userRoutes);
router.use('/order', orderRoutes);
router.use('/cookies', foodRoutes);
router.use('/quantity', quantityRoutes);

module.exports = router;