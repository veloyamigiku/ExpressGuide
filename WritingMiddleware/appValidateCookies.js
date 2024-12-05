const express = require('express');
const cookieParser = require('cookie-parser');
const cookieValidator = require('./utils');
const app = express();

async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies)
    .then(
    () => {
      next();
    },
    (err) => {
      next(err);
    }
  );
}

app.use(cookieParser());
app.use(validateCookies);
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  console.log('listen: ' + port);
});
