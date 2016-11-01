/* eslint-disable one-var */
const userRepo = require('../../repositories/UserRepository'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken');
/* eslint-enable one-var */
const authenticate = function (req, res, next) {
  userRepo.getUserByEmail(req.body.email)
  .then(function (user) {
    if (!user) {
      res.status(500)
        .json({ error: true, data: { message: 'User doesnt exists' } });
    }

    if (bcrypt.compareSync(req.body.password, user.get('password'))) {
      const token = jwt.sign({
        data: user.get('email')
      }, process.env.APP_SECRET, {
        // 24hrs
        expiresIn: '24h',
        // 10 seconds
        notBefore: 10,
        audience: 'http://localhost:3000',
        issuer: 'http://localhost:3000',
        jwtid: user.get('id').toString(),
        subject: user.get('name')
      });

      res.json({
        error: false,
        data: {
          message: 'Login Success',
          token
        }
      });
    } else {
      res.status(401)
        .json({
          error: true,
          data: {
            message: 'Authentication Failed. Wrong password.'
          }
        });
    }
  })
  .catch(function (err) {
    res.status(500).json({ error: true, data: { message: err.message } });
  });
};

module.exports = {
  authenticate
};
