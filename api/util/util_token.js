// modules
const jwt = require('jsonwebtoken');

module.exports = (user) => {
  const payload = {
    usPhoneNumber: user.usPhoneNumber,
    usSocialId: user.usSocialId
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION_DATE,
  });
};
