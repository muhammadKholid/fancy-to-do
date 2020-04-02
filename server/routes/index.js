const express = require('express');
const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.use('/todos', userRouter);
// router.use('/todos', todoRouter);
router.use('/todos', authentication, todoRouter);

module.exports = router;
