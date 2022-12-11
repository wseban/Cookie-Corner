const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Order = require('./Order');

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'order',
    }
  ],
});

/* pre hook that fires before the document is saved */
/* hash the password before saving the new user */
/* not dealing with modifying passwords yet */
userSchema.pre('save', async function(next) {
  if(this.isNew) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

/* on user login, generate hash for entered password */
/* and check against saved password */
userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);
module.exports = User;