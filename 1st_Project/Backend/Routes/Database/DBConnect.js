const mysql = require("mysql2/promise");
require("dotenv").config();

let pool;

async function initializePool() {
  if (!pool) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "WilyFox",
        password: process.env.DB_PASSWORD || "WilyFox@12345",
        multipleStatements: true,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      // Create the database if it doesn't exist
      const dbName = process.env.DB_NAME || "WilyFox";
      await pool.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    } catch (err) {
      console.error("Failed to initialize connection pool:", err.message);
      throw err;
    }
  }
}

async function getConnection() {
  try {
    // Ensure the pool is initialized
    await initializePool();

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Switch to the specified database
    const dbName = process.env.DB_NAME || "WilyFox";
    await connection.changeUser({ database: dbName });

    return connection;
  } catch (err) {
    console.error("Error in getConnection:", err.message);
    throw err;
  }
}

module.exports = { getConnection };