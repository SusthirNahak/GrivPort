const mysql = require("mysql2/promise");
require("dotenv").config();

async function getConnection() {
  let connection;

  try {
    // Step 1: Create a connection without specifying a database
    connection = await mysql.createConnection({
      host: process.env.hostname,
      user: "WilyFox",
      password: process.env.password,
      multipleStatements: true,
    });

    // Step 2: Create the database if it doesn't exist
    const dbName = process.env.pathname || "WilyFox";
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

    // Step 3: Close the initial connection
    await connection.end();

    // Step 4: Reconnect to the newly created/existing database
    connection = await mysql.createConnection({
      host: process.env.hostname,
      user: "WilyFox",
      password: process.env.password,
      database: dbName,
      multipleStatements: true,
    });

    return connection;
  } catch (err) {
    console.error("Error in getConnection:", err.message);
    throw err;
  }
}

module.exports = { getConnection };