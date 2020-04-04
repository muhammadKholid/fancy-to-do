const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      throw new Error('Token not found');
    } else {
      const decoded = jwt.verify(token, process.env.JWTSECRETS);
      req.userId = decoded.userId;
      next();
    }
  } catch {
    next(err);
  }
};

module.exports = authentication;
