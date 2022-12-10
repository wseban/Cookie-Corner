const { User } = require('../models');
module.exports = {
  /* create user on sign up - hash password */
  createUser: async (req, res) => {
    console.log("in createUser");
    try {
      const user = await User.create(req.body);
      user? res.json(user):
        res.status(500).json({message: 'error registering user'});
      return;
    } catch(err) {
      res.json(err);
    }
  },

  getUsers: async (req, res) => {
    console.log("in getUsers");
    try {
      const users = await User.find({});
      users? res.json(users):
        res.status(500).json({message: 'Error getting users'});
      return;
    } catch(err) {
      res.json(err);
    }
  },

  /* get a single user by id, with orders */
  getOneUser: async (req, res) => {
    console.log("in getOneUser");
    try {
      const user = await User.findOne({_id: req.params.userId}).populate('orders');
      user? res.json(user):
        res.status(500).json({message: 'Error finding user'});
      return;
    } catch(err) {
      res.json(err);
    }
  },

  /* login user - check password */
  loginUser: async (req, res) => {
    console.log("in loginUser");
    try {
      const user = await User.findOne({ email: req.body.email});
      if(!user) {
        res.status(500).json({message: 'Error finding user'});
        return;
      }
      /* check password */
      const result = await user.checkPassword(req.body.password);
      result? res.json(user):
        res.status(500).json({message: 'Invalid password'});
      return;
    } catch(err) {
      res.json(err);
    }
  },
  /* log the user out */
  logoutUser: async (req, res) => {
    console.log("in logoutUser");
    res.json({message: 'logged out'});
  },
};