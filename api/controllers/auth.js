/* eslint-disable max-len */
const User = require('../../infra/repositories/user/schema/user');
const {encryptPassword, comparePassword} = require('../../infra/utils/encrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const {email, password, name, lastname, role} = req.body;

  const user = await User.findOne({email: email});
  if (user) {
    user.role = role || user.role;
    user.save();
    console.log('User Updated.', user);
    res.json(user);
  } else {
    const newUser = new User({
      email: email,
      password: await encryptPassword(password),
      name: name,
      lastname: lastname,
      role: role || 'user',
    });
    await newUser.save();
    console.log('User Created.', newUser);
    const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: '86400s'});
    console.log('Token Created.', token);
    res.json({user: newUser});
  }
};
exports.signUser = async (req, res) => {
  const {email, password} = req.body;

  const userFound = await User.findOne({email: email}).populate('role');

  if (!userFound) res.status(404).json({err: 'User not found.'});

  else {
    comparePassword(password, userFound.password).then(
        (match) => {
          if (match) {
            const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: '86400s'});
            res.status(200).json({token});
          } else {
            res.status(401).json({err: 'Invalid credentials'});
          }
        },
    );
  }
};
