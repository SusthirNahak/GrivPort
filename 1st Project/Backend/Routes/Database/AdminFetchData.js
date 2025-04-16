const express = require("express");
const router = express.Router();
const { getConnection } = require('./DBConnect');

router.get("/Data", async (req, res) => {
  let connection;

  try {
    // Step 1: Create connection
    connection = await getConnection();
    console.log("Connected to MySQL: " + connection.threadId);

    // const insertDataQuery = `SELECT * FROM form WHERE Application_Status = 'Pending' OR Application_Status = 'Process';`;
    const insertDataQuery = `SELECT * FROM form;`;

    const [rows] = await connection.query(insertDataQuery);

    console.log("ROWS: ", rows);

    if(rows.length > 0){
      return res.status(200).send({
        success: true,
        message: "Data Found",
        data: rows
      })
    }else{
      return res.status(200).send({
        success: false,
        message: "No Data Found"
      })

    }
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
