const { User } = require('../models');
module.exports = {
  /* create user on sign up - hash password */
  createUser: async (req, res) => {
    console.log("in createUser");
    const user = await User.create(req.body);
    if (!user) {
      res.status(500).json({message: 'error registering user'});
    }
    res.json(user);
  },

  /* get a single user by id, with orders */
  getUser: async (req, res) => {
    console.log("in getUser");
    const user = await User.findOne({_id: req.params.userId}).populate('order');
    if(!user) {
      res.json(500).json({message: 'Error finding user'});
    }
    res.json(user);
  },

  /* login user - check password */
  loginUser: async (req, res) => {
    console.log("in loginUser");
    const user = await User.findOne({ email: req.body.email});
    if(!user) {
      res.status(500).json({message: 'Error finding user'});
    }
    /* check password */
    const result = await user.checkPassword();
    if(!result) {
      res.status(500).json({message: 'Invalid password'});
    }
    /* set loggedIn status? */
  },
  /* log the user out */
  logoutUser: async (req, res) => {
    /* set loggedIn status? */
    console.log("in logoutUser");
  },
};