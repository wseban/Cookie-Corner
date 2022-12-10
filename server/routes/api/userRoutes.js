const router = require('express').Router();

const {
  createUser,
  getOneUser,
  getUsers,
  loginUser,
  logoutUser
} = require('../../controllers/userController');

router.route('/').post(createUser);
router.route('/').get(getUsers);
router.route('/:userId').get(getOneUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

module.exports = router;