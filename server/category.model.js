'use strict';

var db = require('../../config/db.config');

// Advisor object create
var Category = function (category) {
  this.category_title = category.category_title;
  this.category_description = category.category_description;
};

Category.create = function (category_data, result) {
  db.query('INSERT INTO category set ?', category_data, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Category.findAll = function (result) {
  db.query('SELECT * from category', function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('category: ', res);
      result(null, res);
    }
  });
};

Category.findById = function (category_id, result) {
  db.query('SELECT * from category where category_id = ? ', category_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('category: ', res);
      result(null, res);
    }
  });
};

Category.update = function (category_id, category, result) {

  db.query(
    'UPDATE category SET category_title=?, category_description=? WHERE category_id=?',
    [
      category.category_title,
      category.category_description,
      category_id
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

Category.delete = function (category_id, result) {
  db.query('DELETE FROM category WHERE category_id = ?', [category_id], function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('category deleted', res);
      result(null, res);
    }
  });
};

module.exports = Category;
