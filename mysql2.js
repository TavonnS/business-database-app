// get the client
const mysql2 = require('mysql2');

// import env variables
require('dotenv').config();
const password = process.env.PASSWORD;

// create the connection to database
const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'business_db',
  password: password
});

// an example query
/*
const sql = 'SHOW TABLES;';

connection.query(sql, (err, results, fields) => {
  if (err) {
    console.error('Error executing SELECT query:', err);
    return;
  }
  console.log('Results:', results);
});
// 
*/
connection.end();





