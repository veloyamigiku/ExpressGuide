const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;


router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
}, (req, res, next) => {
  if (!req.headers['x-auth']) {
    return next('route');
  }
  else {
    next();
  }
});

router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});

router.get('/user/:id', (req, res, next) => {
  if (req.params.id === '0') next('route');
  else next();
}, (req, res, next) => {
  res.send('regular')
});

router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id);
  res.send('special');
});

router.get('/admin', (req, res) => {
  res.sendStatus(401);
});

router.use('/error/:no', (req, res, next) => {
  if (req.params.no === 0) {
    next();
  } else {
    next(new Error('error'));
  }
});

router.get('/error/:no', (req, res) => {
  res.send('error:', req.params.no);
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//app.use('/', router);
app.use(router);

app.listen(port, () => {
  console.log('listen:', port);
});
