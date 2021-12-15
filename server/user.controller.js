'use strict';

const User = require('../models/user.model');

exports.login = function (req, res) {
  const { username, password } = req.body;

  User.login(username, password, function (err, token) {
    if (err) {
      console.log(err);
      res.status(400).send({ error: true, message: err });
    } else {
      res.json(token);
    }
  }); 
};

exports.create = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Error in application' });
  } else {
    const user = new User({ ...req.body});
    User.create(user, function (err, user) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Data saved successfully', data: user });
    });
  }
};

exports.findAll = function (req, res) {
  User.findAll(function (err, user) {
    if (err) res.send(err);
    res.send(user);
  });
};


exports.getUserList = function (req, res) {
  User.getUserList(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.send(user);
  });
};

exports.findById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.send(user);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Error in application' });
  } else {
    const userToUpdate = new User(req.body);

    User.update(req.params.id, userToUpdate, function (err, result) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Asesor actualizado satisfactoriamente' });
    });
  }
};

exports.delete = function (req, res) {
  User.delete(req.params.id, function (err, result) {
    if (err) res.send(err);
    res.json({ error: false, message: 'Asesor eliminado' });
  });
};

