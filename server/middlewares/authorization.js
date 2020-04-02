const { Todo } = require('../models');

const authorization = function (req, res, next) {
  console.log(req.params.id);
  //terjadi error disini
  Todo.findOne({
    where: {
      UserId: req.userId,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: 'Data not found',
        });
      } else {
        if (data.UserId == req.userId) {
          next();
        } else {
          res.status(400).json({
            message: 'Access forbidden',
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Internal server error' });
    });
};

module.exports = authorization;
