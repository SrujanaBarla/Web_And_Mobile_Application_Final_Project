'use strict';

var db = require('../../config/db.config');
const getAge = require('../../src/helpers/getAge');

// Advisor object create
var Sell = function (sell) {
  this.sell_order_id = sell.sell_order_id;
  this.sell_product_id = sell.sell_product_id;
  this.sell_units = sell.sell_units;
  this.sell_price_per_unit = sell.sell_price_per_unit;
  this.sell_total_cost = sell.sell_total_cost;
};

Sell.create = function (sell_data, result) {
  db.query('INSERT INTO sell set ?', sell_data, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Sell.findAll = function (result) {
  db.query('SELECT * from `sell`', function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('sell: ', res);
      result(null, res);
    }
  });
};

Sell.findById = function (sell_id, result) {
  db.query('SELECT * from sell where sell_id = ? ', sell_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('sell: ', res);
      result(null, res);
    }
  });
};

Sell.orderDetails = function (sell_id, result) {
  db.query('SELECT * from `orders` WHERE order_id = ? ', sell_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('sell: ', res);
      result(null, res);
    }
  });
};

Sell.orderItems = function (sell_id, result) {
  db.query('SELECT * from sell, `orders`, product, restaurant where restaurant_id = product_restaurant_id AND sell_order_id = order_id AND sell_product_id = product_id AND sell_order_id = ? ', sell_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('sell: ', res);
      result(null, res);
    }
  });
};

Sell.update = function (sell_id, sell, result) {

  db.query(
    'UPDATE sell SET sell_order_id=?, sell_product_id=?, sell_units=?, sell_price_per_unit=?, sell_total_cost=? WHERE sell_id=?',
    [
      sell.sell_order_id,
      sell.sell_product_id,
      sell.sell_units,
      sell.sell_price_per_unit,
      sell.sell_total_cost,
      sell_id
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

Sell.delete = function (sell_id, result) {
  db.query('DELETE FROM sell WHERE sell_id = ?', [sell_id], function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('sell deleted', res);
      result(null, res);
    }
  });
};

module.exports = Sell;
