const errorHandler = (err, req, res, next) => {
  if (err.name == 'SequelizeValidationError') {
    res.status(400).json({ message: err.errors[0].message });
  } else if (
    err.message.includes('token') ||
    err.message.includes('denied') ||
    err.message.includes('password')
  ) {
    res.status(403).json({ message: err.message });
  } else if (err.message) {
    res.status(404).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = errorHandler;
