const { Todo } = require('../models');

const authorization = function (req, res, next) {
  Todo.findOne({
    where: {
      UserId: req.userId,
    },
  })
    .then((data) => {
      if (!data) {
        throw new Error('User not found');
      } else {
        if (data.UserId == req.userId) {
          next();
        } else {
          throw new Error('Access denied');
        }
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = authorization;
