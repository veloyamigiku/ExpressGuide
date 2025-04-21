const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/catch_error1', (req, res) => {
  throw new Error('BROKEN');
});

app.get('/catch_error2', (req, res, next) => {
  fs.readFile('/file-does-not-exists', (err, data) => {
    if (err) {
      next(err);
    } else {
      res.send(data);
    }
  });
});

async function getUserById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //resolve({'id': 1, 'name': 'hoge'});
      //reject();
      reject(new Error('getUserById Error.'));
    }, 3000);
  });
}

app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id);
  res.send(user);
});

app.get('/write', [
  function (req, res, next) {
    //fs.writeFile('./inaccessible-path', 'data', next);
    fs.writeFile('./test/inaccessible-path', 'data', next);
  },
  function (req, res) {
    res.send('OK');
  }
]);

app.get('/next_err', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN');
    } catch (err) {
      next(err);
    }
  }, 1000);
});

app.get('/promise_err', (req, res, next) => {
  new Promise((resolve, reject) => {
    //throw new Error('Promise_main_err.');
    resolve();
  }).then(() => {
    throw new Error('Promise_resolve_then_err.');
  }).catch(next);
});

app.get('/read', [
  function (req, res, next) {
    fs.readFile('/maybe-valid-file', 'utf-8', (err, data) => {
    //fs.readFile('./catch_errors.js', 'utf-8', (err, data) => {
      res.locals.data = data;
      next(err);
    });
  },
  function (req, res) {
    res.locals.data = res.locals.data.split(',')[1];
    res.send(res.locals.data);
  }
]);

app.listen(
  port,
  () => {
    console.log('listen: ' +  port);     
  }
);
