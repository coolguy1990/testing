const authLogin = require('../controllers/auth/login');
const authRegister = require('../controllers/auth/register');

const welcome = (req, res) => {
  res.send('hello, welcome to the homeautomation api');
};

module.exports = {
  welcome,
  auth: {
    authenticate: authLogin.authenticate,
    register: authRegister.register,
  },
};
