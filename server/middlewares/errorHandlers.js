const errorHandler = function (err, req, res, next) {
  console.log(err);
  let error = ['Internal server error'];
  let status = 500;
  if (err.name == 'SequelizeValidationError') {
    errors = [];
    status = 400;
    err.errors.forEach(function (e) {
      errors.push(e.message);
    });
  } else {
    res.status(status).json(error);
  }
};

module.exports = errorHandler;
