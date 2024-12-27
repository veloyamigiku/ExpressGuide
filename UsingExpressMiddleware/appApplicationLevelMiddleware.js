const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  // 応答は404が返却されるが、以下のコードは実行される。
  console.log('Timer:', Date.now());
  next();
});


app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});

app.get('/user/:id', (req, res, next) => {
  res.send('User');
});


app.use('/user_series/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});

app.get('/user_series/:id', (req, res, next) => {
  res.send('User Series');
});


app.get('/user_double_route/:id', (req, res, next) => {
  // 1番目
  console.log('ID:', req.params.id);
  next();
}, (req, res, next) => {
  // 2番目
  console.log('User Info');
  next();
});

app.get('/user_double_route/:id', (req, res, next) => {
  // 3番目
  res.send(req.params.id);
});


app.get('/user_skip/:id', (req, res, next) => {
  // 1番目
  console.log('ID:', req.params.id);
  if (req.params.id == 1) {
    next('route');
  } else {
    next();
  }
}, (req, res, next) => {
  // 実行されない
  console.log('User Info');
  next();
});

app.get('/user_skip/:id', (req, res, next) => {
  // 2番目
  res.send(req.params.id);
});


function logOriginalUrl(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log('Request Type:', req.method);
  next();
}

const logStuff = [logOriginalUrl, logMethod];
app.get('/user_array/:id', logStuff, (req, res, next) => {
  res.send('User Info');
});


app.listen(port, () => {
  console.log('listen: ' + port);
});