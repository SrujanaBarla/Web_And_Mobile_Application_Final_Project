'use strict';

var db = require('../../config/db.config');
const getAge = require('../../src/helpers/getAge');

// Advisor object create
var Product = function (product) {
  this.product_code = product.product_code;
  this.product_title = product.product_title;
  this.product_type_id = product.product_type_id;
  this.product_price_per_item = product.product_price_per_item;
  this.product_stock = product.product_stock;
  this.product_description = product.product_description;
};

Product.create = function (product_data, result) {
  db.query('INSERT INTO product set ?', product_data, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Product.getProductList = function (category_id, result) {
  db.query('SELECT * from product, category, restaurant WHERE restaurant_id =  product_restaurant_id AND product_category_id = category_id AND category_id = ?', category_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('product: ', res);
      result(null, res);
    }
  });
};

Product.findAll = function (result) {
  db.query('SELECT * from product, category WHERE product_category_id = category_id', function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('product: ', res);
      result(null, res);
    }
  });
};

Product.findById = function (product_id, result) {
  db.query('SELECT * from product, category, restaurant WHERE restaurant_id =  product_restaurant_id AND product_category_id = category_id AND product_id = ? ', product_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('product: ', res);
      result(null, res);
    }
  });
};

Product.update = function (product_id, product, result) {

  db.query(
    'UPDATE product SET product_code=?, product_title=?, product_type_id=?, product_price_per_item=?, product_stock=?, product_description=? WHERE product_id=?',
    [
      product.product_code,
      product.product_title,
      product.product_type_id,
      product.product_price_per_item,
      product.product_stock,
      product.product_description,
      product_id
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

Product.delete = function (product_id, result) {
  db.query('DELETE FROM product WHERE product_id = ?', [product_id], function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('product deleted', res);
      result(null, res);
    }
  });
};

module.exports = Product;
