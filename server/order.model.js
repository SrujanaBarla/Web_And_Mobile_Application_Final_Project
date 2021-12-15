'use strict';

var db = require('../../config/db.config');
const getAge = require('../../src/helpers/getAge');

// Advisor object create
var Order = function (order) {
  this.order_customer_id = order.order_customer_id;
  this.order_total = order.order_total;
  this.order_status = order.order_status;
  this.order_date = order.order_date;
};

Order.create = function (order_data, result) {
  db.query('INSERT INTO `orders` set ?', order_data, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Order.findAll = function (result) {
  db.query('SELECT * from `orders`', function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('order: ', res);
      result(null, res);
    }
  });
};

Order.getAllOrders = function (customer_id, result) {
  db.query('SELECT * from `orders`, `customer` WHERE order_customer_id = customer_id AND order_customer_id = ?', customer_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('order: ', res);
      result(null, res);
    }
  });
};

Order.findById = function (order_id, result) {
  db.query('SELECT * from `orders`, `customer` where order_customer_id = customer_id AND order_id = ? ', order_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('order: ', res);
      result(null, res);
    }
  });
};

Order.update = function (order_id, order, result) {

  db.query(
    'UPDATE `orders` SET order_total=?, order_status=? WHERE order_id=?',
    [
      order.order_total,
      order.order_status,
      order_id
    ],
    function (err, res) {
      if (err) {
        console.log('error', err);
        result(err, null);
      } else {
        console.log('update: ', res);
        result(null, res);
      }
    }
  );
};

Order.delete = function (order_id, result) {
  db.query('DELETE FROM `orders` WHERE order_id = ?', [order_id], function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('order deleted', res);
      result(null, res);
    }
  });
};

module.exports = Order;
