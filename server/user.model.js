'use strict';
const jwt = require('jsonwebtoken');
var db = require('../../config/db.config');

var User = function (user) {
  this.customer_id = user.customer_id;
  this.customer_email = user.customer_email;
  this.customer_password = user.customer_password;
  this.customer_first_name = user.customer_first_name;
  this.customer_last_name = user.customer_last_name;
  this.customer_dob = user.customer_dob;
  this.customer_city = user.customer_city;
  this.customer_address = user.customer_address;
  this.customer_state = user.customer_state;
  this.customer_country = user.customer_country;
  this.customer_mobile = user.customer_mobile;
  this.customer_nationalty = user.customer_nationalty;
};

User.login = function (username, password, result) {
  console.log("User Name = "+username+" and Password :"+password);
  db.query('SELECT * FROM customer WHERE customer_email = ? AND customer_password = ?', [username, password], function (err, res) {
    if (err) {
      console.log('error login', err);
      result(err, null);
    } else {
      const user = res[0];
      console.log(user)

      if (!user) {
        result('Invalid Username and Password. Kindly try again !!!!', null);
      } else {
        console.log('Login Data');
        console.log(user);
        const token = generateJwtToken(res[0]);
        result(null, {
          customer_id: user.customer_id,
          user_data: user,
          accessToken: token
        });
      }
    }
  });
};

function generateJwtToken(user) {
  const payload = {
    user: {
      id: user.id,
      username: user.username,
      active: user.active,
      name: user.name
    }
  };

  return jwt.sign(payload, 'MyS3cr3t', { expiresIn: '7d' });
}


User.create = function (user_data, result) {
  db.query('INSERT INTO customer set ?', user_data, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.getUserList = function (category_id, result) {
  db.query('SELECT * from user, category, restaurant WHERE restaurant_id =  user_restaurant_id AND user_category_id = category_id AND category_id = ?', category_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('user: ', res);
      result(null, res);
    }
  });
};

User.findAll = function (result) {
  db.query('SELECT * from user, category WHERE user_category_id = category_id', function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('user: ', res);
      result(null, res);
    }
  });
};

User.findById = function (user_id, result) {
  db.query('SELECT * from customer WHERE user_id = ? ', user_id, function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('user: ', res);
      result(null, res);
    }
  });
};

User.update = function (user_id, user, result) {

  db.query(
    'UPDATE `customer` SET `customer_email` = ?, `customer_password` = ?, `customer_first_name` = ?, `customer_last_name` = ?, `customer_dob` = ?, `customer_address` = ?, `customer_city` = ?, `customer_state` = ?, `customer_country` = ?, `customer_mobile` = ?, `customer_nationalty` = ? WHERE `customer_id` = ?',
    [
      user.customer_email,
      user.customer_password,
      user.customer_first_name,
      user.customer_last_name,
      user.customer_dob,
      user.customer_address,
      user.customer_city,
      user.customer_state,
      user.customer_country,
      user.customer_mobile,
      user.customer_nationalty,
      user_id
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

User.delete = function (user_id, result) {
  db.query('DELETE FROM user WHERE user_id = ?', [user_id], function (err, res) {
    if (err) {
      console.log('error', err);
      result(err, null);
    } else {
      console.log('user deleted', res);
      result(null, res);
    }
  });
};


module.exports = User;
