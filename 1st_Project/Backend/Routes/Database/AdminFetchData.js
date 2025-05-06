const express = require("express");
const router = express.Router();
const { getConnection } = require("./DBConnect");

router.get("/Data", async (req, res) => {
  let connection;

  try {
    // Step 1: Create connection
    connection = await getConnection();

    const insertDataQuery = `SELECT * FROM form ORDER BY id DESC;`;

    const [rows] = await connection.query(insertDataQuery);

    if (rows.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Data Found",
        data: rows,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "No Data Found",
      });
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
      connection.release();
    }
  }
});

module.exports = router;
