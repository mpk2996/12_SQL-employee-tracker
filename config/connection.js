const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'user',
  password: 'password',
  database: 'db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the connection pool
module.exports = pool.promise();
