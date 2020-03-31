require('dotenv').config();
const express = require('express');
const router = require('./routes/index');
const handler = require('./middlewares/errorHandlers');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(handler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
