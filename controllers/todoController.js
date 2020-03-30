const { Todo } = require('../models');

class Controller {
  static addTodo(req, res) {
    const addedData = req.body;
    Todo.create(addedData)
      .then((data) => {
        console.log(data);
        res.status(201).json({ data });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Server error' });
      });
  }

  //static getTodo(req, res) {
  //  //
  //  Todo.findAll();
  //}

  //static editTodo(req, res) {
  //  //
  //  Todo.update({ where: { id: id } });
  //}

  //static deleteTodo(req, res) {
  //  //
  //  Todo.destroy({ where: { id: id } });
  //}
}

module.exports = Controller;
