const { Todo } = require('../models');

class Controller {
  static addTodo(req, res, next) {
    console.log(req.userId);
    const addedData = req.body;
    Todo.create({
      title: addedData.title,
      descriptions: addedData.descriptions,
      status: addedData.status,
      due_date: addedData.due_date,
      UserId: req.userId,
    })
      .then((data) => {
        console.log(data);
        res.status(201).json({ data, message: 'Berhasil menambahkan data' });
      })
      .catch((err) => {
        if (err.errors[0].message) {
          next(err);
          // res.status(400).json({ message: err.errors[0].message });
        } else {
          next(err);
          // res.status(500).json({ message: 'Internal server error' });
        }
      });
  }

  static getTodo(req, res, next) {
    Todo.findAll({
      where: {
        UserId: req.userId,
      },
    })
      .then((data) => {
        res.status(200).json({ data: data });
      })
      .catch((err) => {
        next(err);
        // res.status(500).json({ message: 'Internal server error' });
      });
  }

  static getSpecificTodo(req, res, next) {
    const id = req.params.id;
    Todo.findOne({ where: { id: id } })
      .then((data) => {
        if (data) {
          res.status(200).json({ data });
        } else {
          // throw new Error('Not found');
          res.status(404).json({ message: 'Not found' });
        }
      })
      .catch((err) => {
        next(err);
        // res.status(500).json({ message: 'Inyernal server error' });
      });
  }

  static editTodo(req, res, next) {
    const editedData = req.body;
    const id = req.params.id;
    Todo.update(
      {
        title: editedData.title,
        descriptions: editedData.descriptions,
        status: editedData.status,
        due_date: editedData.due_date,
      },
      { where: { id: id } }
    )
      .then((data) => {
        if (data == 0) {
          // throw new Error('Not found');
          res.status(404).json({ message: 'Not found' });
        } else {
          res.status(200).json({ message: 'Berhasil mengubah data' });
        }
      })
      .catch((err) => {
        if (err.errors[0].message) {
          next(err);
          // res.status(400).json({ message: err.errors[0].message });
        } else {
          next(err);
          // res.status(500).json({ message: 'Internal server error' });
        }
      });
  }

  static deleteTodo(req, res, next) {
    const id = req.params.id;
    Todo.destroy({ where: { id: id } })
      .then((data) => {
        if (data == 0) {
          // throw new Error('Not found');
          res.status(404).json({ message: 'Not found' });
        } else {
          res.status(200).json({ message: 'Berhasil menghapus data' });
        }
      })
      .catch((err) => {
        next(err);
        // res.status(500).json({ message: 'Internal server error' });
      });
  }
}

module.exports = Controller;
