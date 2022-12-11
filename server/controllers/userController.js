const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  /* create user on sign up - hash password */
  createUser: async (req, res) => {
    console.log("in createUser");
    try {
      console.log(req.body);
      const user = await User.create(req.body);
      if (user) { 
        /* generate JWT with the data from the user, and return to client */
        const token = signToken(user);
        res.json({token, user}); 
      }
      else {
        res.status(500).json({message: 'error registering user'});
      }
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
      console.log("userId:" + req.params.userId);
      const user = await User.findOne({_id: req.params.userId}).populate('orders');
      console.log("found user:" + user);
      user? res.json(user):
        res.status(500).json({message: 'Error finding user'});
      return;
    } catch(err) {
      res.json(err);
    }
  },

    /* get the currently logged in user (me), with orders */
    getMe: async (req, res) => {
      console.log("in getMe");
      try {
        console.log("user._id:" + req.user._id);
        const user = await User.findOne({_id: req.user._id}).populate('orders');
        console.log("found user:" + user);
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
      if (result) { 
        /* generate JWT with the data from the user, and return to client */
        const token = signToken(user);
        res.json({ token, user});
      } else {
        res.status(500).json({message: 'Invalid password'});
      }
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