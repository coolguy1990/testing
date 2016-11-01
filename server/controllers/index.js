/* eslint-disable one-var */
const authLogin = require('../controllers/auth/login'),
  authRegister = require('../controllers/auth/register'),
  welcome = function (req, res, next) {
    res.send('hello, welcome to the homeautomation api');
  };
/* eslint-enable one-var */

module.exports = {
  welcome,
  auth: {
    authenticate: authLogin.authenticate,
    register: authRegister.register
  }
};
