const express = require('express');
const todoController = require('../controllers/todoController');
const authorization = require('../middlewares/authorization');

const router = express.Router();

//add list todo
router.post('/', todoController.addTodo);
//get all todo list
// router.get('/', todoController.getTodo);
router.get('/', authorization, todoController.getTodo);
//get list based on the id
router.get('/:id', authorization, todoController.getSpecificTodo);
//update data
router.put('/:id', authorization, todoController.editTodo);
//delete data
router.delete('/:id', authorization, todoController.deleteTodo);

module.exports = router;

