const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      res.status(403).json({ message: 'Token not found' });
    } else {
      const decoded = jwt.verify(token, process.env.JWTSECRETS);
      req.userId = decoded.userId;
      next();
    }
  } catch {
    res.status(400).json({ message: 'Request bad error' });
  }
};

module.exports = authentication;
