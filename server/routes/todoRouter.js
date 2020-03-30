const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

//add list todo
router.post('/', todoController.addTodo);
//get all todo list
router.get('/', todoController.getTodo);
//get list based on the id
router.get('/:id', todoController.getSpecificTodo);
//update data
router.put('/:id', todoController.editTodo);
//delete data
router.delete('/:id', todoController.deleteTodo);

module.exports = router;

