const express = require('express');
const app = express();

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
}

app.use(myLogger);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const port = 3000;
app.listen(port, () => {
  console.log('listen: ' + port);
});
