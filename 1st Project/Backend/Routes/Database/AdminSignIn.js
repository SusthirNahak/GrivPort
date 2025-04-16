const express = require("express");
const router = express.Router();
const { getConnection } = require('./DBConnect');

// Endpoint to check and create database, table, and insert data
router.post("/SignIn", async (req, res) => {
  const { email, password } = req.body;

  console.log("BODY: ", req.body);

  let connection;

  try {
    // Step 1: Create connection
    connection = await getConnection();
    console.log("Connected to MySQL: " + connection.threadId);

    // // Step 2: Check if the database exists, and create it if it doesn't
    // await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    // console.log("Database checked/created successfully.");

    // // Step 3: Select the database
    // await connection.query(`USE ${dbName}`);
    // console.log("Database selected successfully.");

    // Step 4: Check if the table exists, and create it if it doesn't
    // const createTableQuery = `

    // `;
    // await connection.query(createTableQuery);
    // console.log("Table checked/created successfully.");

    const insertDataQuery = `SELECT * FROM AdminData WHERE Email = ? AND Password = ?;`;

    const [rows] = await connection.query(insertDataQuery, [
      email.toLowerCase(),
      password,
    ]);

    console.log("ROWS: ", rows.length);

    if (rows.length === 0) {
		console.log("Sending 401 response: Invalid credentials");
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully Log In",
      data: rows[0].FirstName,
    });
  } catch (err) {
    console.error("Error:", err.stack || err.message);
    res.status(500).send({
      success: false,
      error: `Server Error: ${err.message}`,
    });
  } finally {
    // Close the connection
    if (connection) {
      await connection.end();
      console.log("MySQL connection closed.");
    }
  }
});

module.exports = router;
