const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

//add list todo
router.post('/', todoController.addTodo);
//get all todo list
// router.get('/', todoController.getTodo);

module.exports = router;

