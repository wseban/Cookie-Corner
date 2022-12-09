const router = require('express').Router();

const {
  createUser,
  getUser,
  loginUser,
  logoutUser
} = require('../../controllers/userController');

router.route('/').post(createUser);
router.route('/:userId').get(getUser);
router.route('/login').post(loginUser);
router.route('/logout', logoutUser);

module.exports = router;