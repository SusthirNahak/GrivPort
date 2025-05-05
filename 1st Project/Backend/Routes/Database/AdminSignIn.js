const express = require("express");
const router = express.Router();
const { getConnection } = require('./DBConnect');

// Endpoint to check and create database, table, and insert data
router.post("/SignIn", async (req, res) => {
  const { email, password } = req.body;

  let connection;

  try {
    // Step 1: Create connection
    connection = await getConnection();

    const insertDataQuery = `SELECT * FROM AdminData WHERE Email = ? AND Password = ?;`;

    const [rows] = await connection.query(insertDataQuery, [
      email.toLowerCase(),
      password,
    ]);

    if (rows.length === 0) {
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
        connection.release();
    }
}
});

module.exports = router;
