'use strict';

const Sell = require('../models/sell.model');

exports.create = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Error in application' });
  } else {
    const sell = new Sell({ ...req.body });
    Sell.create(sell, function (err, sell) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Data saved successfully', data: sell });
    });
  }
};

exports.findAll = function (req, res) {
  Sell.findAll(function (err, sell) {
    if (err) res.send(err);
    res.send(sell);
  });
};

exports.findById = function (req, res) {
  Sell.findById(req.params.id, function (err, sell) {
    if (err) res.send(err);
    res.send(sell);
  });
};


exports.orderDetails = function (req, res) {
  Sell.orderDetails(req.params.id, function (err, sell) {
    if (err) res.send(err);
    res.send(sell);
  });
};

exports.orderItems = function (req, res) {
  Sell.orderItems(req.params.id, function (err, sell) {
    if (err) res.send(err);
    res.send(sell);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).send({ error: true, message: 'Error in application' });
  } else {
    const sellToUpdate = new Sell(req.body);

    Sell.update(req.params.id, sellToUpdate, function (err, result) {
      if (err) res.send(err);
      res.json({ error: false, message: 'Asesor actualizado satisfactoriamente' });
    });
  }
};

exports.delete = function (req, res) {
  Sell.delete(req.params.id, function (err, result) {
    if (err) res.send(err);
    res.json({ error: false, message: 'Asesor eliminado' });
  });
};
