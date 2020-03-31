const { Todo } = require('../models');

class Controller {
  static addTodo(req, res) {
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
          res.status(400).json({ message: err.errors[0].message });
        } else {
          res.status(500).json({ message: 'Internal server error' });
        }
      });
  }

  static getTodo(req, res) {
    Todo.findAll()
      .then((data) => {
        res.status(200).json({ data: data });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Internal server error' });
      });
  }

  static getSpecificTodo(req, res) {
    const id = req.params.id;
    Todo.findOne({ where: { id: id } })
      .then((data) => {
        if (data) {
          res.status(200).json({ data });
        } else {
          res.status(404).json({ message: 'Not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Inyernal server error' });
      });
  }

  static editTodo(req, res) {
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
          res.status(404).json({ message: 'Not found' });
        } else {
          res.status(200).json({ message: 'Berhasil mengubah data' });
        }
      })
      .catch((err) => {
        if (err.errors[0].message) {
          res.status(400).json({ message: err.errors[0].message });
        } else {
          res.status(500).json({ message: 'Internal server error' });
        }
      });
  }

  static deleteTodo(req, res) {
    const id = req.params.id;
    Todo.destroy({ where: { id: id } })
      .then((data) => {
        if (data == 0) {
          res.status(404).json({ message: 'Not found' });
        } else {
          res.status(200).json({ message: 'Berhasil menghapus data' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Internal server error' });
      });
  }
}

module.exports = Controller;
