/* eslint-disable max-len */
const admin = require('../firebase');
const User = require('../models/user');

// middlewares validation
exports.authCheck = async (req, res) => {
  const {email} = req.user;
  const user = await User.findOneAndUpdate(
      {email},
      {name: email.split('@')[0]},
      {new: true},
  );

  if (user) {
    console.log('User updated', user);
    res.json(user);
  } else {
    const newUser = await new User({
      email: email,
      name: email.split('@')[0],
    }).save();
    console.log('User created', newUser);
  }
};

exports.adminCheck = async () => {
  const {email} = req.user;

  const user = await User.findOne({email}).exec();

  if (user.role !== 'admin') {
    res.status(403).json({err: 'You are not authorized to perform this action'});
  } else {
    next();
  }
};

