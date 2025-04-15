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

app.listen(
  port,
  () => {
    console.log('listen: ' +  port);     
  }
);
