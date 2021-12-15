'use strict';

const Category = require('../models/category.model');

exports.create = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Error in application' });
  } else {
    const category = new Category({ ...req.body, user: req.user.id });
    Category.create(category, function (err, category) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Data saved successfully', data: category });
    });
  }
};

exports.findAll = function (req, res) {
  Category.findAll(function (err, category) {
    if (err) res.send(err);
    res.send(category);
  });
};

exports.findById = function (req, res) {
  Category.findById(req.params.id, function (err, category) {
    if (err) res.send(err);
    res.send(category);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Error in application' });
  } else {
    const categoryToUpdate = new Category(req.body);

    Category.update(req.params.id, categoryToUpdate, function (err, result) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Asesor actualizado satisfactoriamente' });
    });
  }
};

exports.delete = function (req, res) {
  Category.delete(req.params.id, function (err, result) {
    if (err) res.send(err);
    res.json({ error: false, message: 'Asesor eliminado' });
  });
};
