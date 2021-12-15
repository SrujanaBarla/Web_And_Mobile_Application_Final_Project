'use strict';

const Order = require('../models/order.model');

exports.create = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Error in application' });
  } else {
    const order = new Order({ ...req.body });
    Order.create(order, function (err, order) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Data saved successfully', data: order });
    });
  }
};

exports.findAll = function (req, res) {
  Order.findAll(function (err, order) {
    if (err) res.send(err);
    res.send(order);
  });
};

exports.getAllOrders = function (req, res) {
  Order.getAllOrders(req.params.id, function (err, order) {
    if (err) res.send(err);
    res.send(order);
  });
};

exports.findById = function (req, res) {
  Order.findById(req.params.id, function (err, order) {
    if (err) res.send(err);
    res.send(order);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Error in application' });
  } else {
    const orderToUpdate = new Order(req.body);

    Order.update(req.params.id, orderToUpdate, function (err, result) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Asesor actualizado satisfactoriamente' });
    });
  }
};

exports.delete = function (req, res) {
  Order.delete(req.params.id, function (err, result) {
    if (err) res.send(err);
    res.json({ error: false, message: 'Asesor eliminado' });
  });
};
