const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;


router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // 1-1に遷移
}, (req, res, next) => {
  // 1-1
  if (!req.headers['x-auth']) {
    return next('route'); // 1-2に遷移
  }
  else {
    next(); // 1-2に遷移 
  }
});

router.use('/user/:id', (req, res, next) => {
  // 1-2
  console.log('Request URL:', req.originalUrl);
  next(); // 1-3に遷移
}, (req, res, next) => {
  // 1-3
  console.log('Request Type:', req.method);
  next(); // 1-4に遷移
});

router.get('/user/:id', (req, res, next) => {
  // 1-4
  if (req.params.id === '0') next('route'); // 1-6に遷移
  else next(); // 1-5に遷移
}, (req, res, next) => {
  // 1-5
  res.send('regular')
});

router.get('/user/:id', (req, res, next) => {
  // 1-6
  console.log(req.params.id);
  res.send('special');
});

router.get('/admin', (req, res) => {
  res.sendStatus(401);
});

//app.use('/', router);
app.use(router);

app.listen(port, () => {
  console.log('listen:', port);
});
