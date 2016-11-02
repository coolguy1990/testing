const express = require('express');
const models = require('../models');
const userRepo = require('../repositories/UserRepository');

const router = express.Router();
models.init();

// get all users
router.get('/', (req, res) => {
  userRepo.getAllUsers()
  .then((collection) => {
    res.json({
      error: false,
      data: collection.toJSON(),
    });
  })
  .catch((err) => {
    res.status(500)
    .json({
      error: true,
      data: {
        message: err.message,
      },
    });
  });
});

// create user
router.post('/', (req, res) => {
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
});

// get user
router.get('/:id', (req, res) => {
  userRepo
  .getUserById(req.params.id)
  .then((user) => {
    if (!user) {
      res.status(404).json({ error: true, data: {} });
    }

    res.json({ error: false, data: user.toJSON() });
  })
  .catch((err) => {
    res.status(500).json({ error: true, data: { message: err.message } });
  });
});

// update user
router.put('/:id', (req, res) => {
  userRepo.updateUser(req.params.id, {
    name: req.body.name,
    email: req.body.email,
  }, (user) => {
    user
    .then(() => {
      res.json({ error: false, data: { message: 'User details updated' } });
    })
    .catch((err) => {
      res.status(500).json({ error: true, data: { message: err.message } });
    });
  })
  .catch((err) => {
    res.status(500).json({ error: true, data: { message: err.message } });
  });
});

// delete user
router.delete('/:id', (req, res) => {
  userRepo.deleteUser(req.params.id, (user) => {
    user
    .then(() => {
      res.json({ error: false, data: { message: 'User successfully deleted' } });
    })
    .catch((err) => {
      res.status(500).json({ error: true, data: { message: err.message } });
    });
  })
  .catch((err) => {
    res.status(500).json({ error: true, data: { message: err.message } });
  });
});

module.exports = router;
