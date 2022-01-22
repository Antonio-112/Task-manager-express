const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (user) {
    // Update
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save();
  } else {
    // Create
    const newUser = new User(req.body);
    await newUser.save();
  }
  res.send('User created');
};

exports.currentUser = async(req, (res) => {

});
