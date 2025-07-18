const express = require('express');

const app = express();
const port = 3000;

console.log(process.env.DEBUG);
app.response.sendStatus = function (statusCode, type, message) {
  return this.contentType(type)
    .status(statusCode)
    .send(message);
}

app.get('/method', (req, res) => {
  //res.sendStatus(200);
  res.sendStatus(
    404,
    'application/json',
    '{"error":"resource not found"}'
  );
});

app.listen(
  port,
  () => {
    console.log('listen: ' +  port);     
  }
);
