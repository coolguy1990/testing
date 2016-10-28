var express = require('express');
var router = express.Router();
var models = require('../models');
var userRepo = require('../repositories/UserRepository');

models.init();

//get all users
router.get('/', function(req, res, next) {
  userRepo.getAllUsers()
  .then(function(collection) {
    res.json({
      error: false,
      data: collection.toJSON()
    });
  })
  .catch(function(err) {
    res.status(500)
    .json({
      error: true,
      data: {
        message: err.message
      }
    });
  });
});

//create user
router.post('/', function (req, res, next) {
  userRepo.createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then(function(user) {
    res.json({error: false, data: {id: user.id}});
  })
  .catch(function(err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

//get user
router.get('/:id', function(req, res, next) {
  userRepo
  .getUserById(req.params.id)
  .then(function (user) {
    if (!user) {
      res.status(404).json({error: true, data: {}});
    }

    res.json({error: false, data: user.toJSON()});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

//update user
router.put('/:id', function(req, res, next) {
  userRepo.updateUser(req.params.id, {
    name: req.body.name,
    email: req.body.email
  }, function (user) {
    user
    .then(function () {
      res.json({error: false, data: {message: 'User details updated'}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })
  .catch( function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

//delete user
router.delete('/:id', function(req, res, next) {
  userRepo.deleteUser(req.params.id, function (user) {
    user
    .then(function () {
      res.json({error: false, data: {message: 'User successfully deleted'}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

module.exports = router;
