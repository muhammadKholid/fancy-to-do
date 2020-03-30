const express = require('express');
const todoRouter = require('./todoRouter');

const router = express.Router();

router.use('/todos', todoRouter);

module.exports = router;
