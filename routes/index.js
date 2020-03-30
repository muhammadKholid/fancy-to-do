const express = require('express');
const router = express.Router();
const todoRouter = require('./todoRouter');

router.use('/todos', todoRouter);

module.exports = router;
