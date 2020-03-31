const jwt = require('jsonwebtoken');

const authentication = function (req, res, next) {
  try {
    console.log('try');
    const token = req.headers.token;
    console.log(token);
    if (!token) {
      res.status(404).json({ message: 'Token not found' });
    } else {
      const decoded = jwt.verify(token, 'rahasia illahi');
      console.log(decoded);
      req.userId = decoded.userId;
      next();
    }
  } catch {
    console.log('catch');
    res.status(400).json({ message: 'Request bad error' });
  }
};

module.exports = authentication;
