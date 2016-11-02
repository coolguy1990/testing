const userRepo = require('../../repositories/UserRepository');

const register = (req, res) => {
  userRepo.createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  .then((user) => {
    res.json({ error: false, data: { id: user.id } });
  })
  .catch((err) => {
    res.status(500).json({ error: true, data: { message: err.message } });
  });
};

module.exports = {
  register,
};
