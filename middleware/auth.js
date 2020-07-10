const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get Token from header
  const token = req.header('x-auth-token'); // JSON Web Token is in this request header

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token, Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtsecret')); // This will get JWT Payload (i.e, userid, expiresat & installedat)

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
