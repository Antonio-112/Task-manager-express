const User = require('../../../infra/repositories/user/schema/user');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  if ( !token === 'null' ) {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  };


  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    const user = await User.findOne({email: decode.email}).exec();
    req.body.userId = user._id;
    if (!user) {
      return res.status(404).json({
        err: 'User not found',
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: 'Invalid or expired token',
    });
  }
};
exports.giveAdminRole = async (req, res, next) => {
  req.body.role = 'admin';
  next();
};

exports.isAdmin = async (req, res, next) => {
  const adminUser = await User.findOne({_id: req.body.userId}).exec();
  console.log(adminUser);

  if (!adminUser) return res.status(404).json({err: 'User not found.'});

  if (adminUser.role !== 'admin') {
    return res.status(403).json({
      err: 'Admin resource. Access denied.',
    });
  } else {
    next();
  }
};
