const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "db", // Default auf "db"
  user: process.env.MYSQL_USER || "appuser",
  password: process.env.MYSQL_PASSWORD || "userpwd",
  database: process.env.MYSQL_DATABASE || "db_annonces",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const port = process.env.PORT || 3000; // Default-Port 3000

module.exports = { pool, port };
