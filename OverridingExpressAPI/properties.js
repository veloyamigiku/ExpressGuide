const express = require('express');

const app = express();
const port = 3000;

Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get () {
    return this.get('Client-IP');
  }
})

app.get('/prop', (req, res) => {
  res.send('req.ip: ' + req.ip);
});

app.listen(
  port,
  () => {
    console.log('listen: ' +  port);     
  }
);
