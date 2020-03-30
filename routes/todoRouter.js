const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

//add list todo
router.post('/todos', todoController.addTodo);
//get all todo list
router.get('/todos', todoController.getTodo);

module.exports = router;

