const { Todo } = require('../models');

class Controller {
  static addTodo(req, res) {
    const { title, description, status, due_date } = req.body;
    Todo.create({});
  }
  static getTodo(req, res) {
    //
    Todo.findAll();
  }

  static editTodo(req, res) {
    //
    Todo.update({ where: { id: id } });
  }

  static deleteTodo(req, res) {
    //
    Todo.destroy({ where: { id: id } });
  }
}

module.exports = Controller;
