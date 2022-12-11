const router = require('express').Router();

const {
  createUser,
  getOneUser,
  getUsers,
  getMe,
  loginUser,
  logoutUser
} = require('../../controllers/userController');

/* Middleware for JWT */
const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser);
router.route('/').get(getUsers);
router.route('/me').get(authMiddleware, getMe);
router.route('/:userId').get(getOneUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

module.exports = router;