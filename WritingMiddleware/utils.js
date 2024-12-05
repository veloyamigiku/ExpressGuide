const cookieValidator = (cookies) => {
  return new Promise((resolve, reject) => {
    // ブラウザの開発者ツールでCookieを設定すること。
    if (cookies['test'] === 'sample') {
      resolve();
    } else {
      reject(new Error('cookie is invalid.'));
    }
  });
}
module.exports = cookieValidator;