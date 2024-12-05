const express = require('express');
const app = express();

const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
}

app.use(requestTime);

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>';
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

const port = 3000;
app.listen(port, () => {
  console.log('listen: ' + port);
});
