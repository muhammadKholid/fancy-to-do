const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/todoRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(router);
app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
