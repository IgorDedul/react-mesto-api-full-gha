const ALLOWED_CORS = [
  'https://mesto.service.nomoredomainsclub.ru',
  'https://api.mesto.service.nomoredomainsclub.ru',
  'http://mesto.service.nomoredomainsclub.ru',
  'http://api.mesto.service.nomoredomainsclub.ru',
  'localhost:3000',
];
const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
