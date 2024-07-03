"use strict";

var mysql = require('mysql'); // Create a connection to the database


var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1207',
  database: 'rmkec'
}); // Connect to the database

db.connect(function (err) {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the MySQL database.');
});
module.exports = db;