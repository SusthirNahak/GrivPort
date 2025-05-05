const express = require("express");
const router = express.Router();
const { getConnection } = require("./Database/DBConnect");
require("dotenv").config();

router.get("/:token", async (req, res) => {
  const { token } = req.params;
  let connection;

  try {
    connection = await getConnection();

    const [rows] = await connection.query(
      `SELECT * FROM form WHERE resolution_token = ?`,
      [token]
    );

    if (rows.length === 0) {
      return res.status(404).send("Invalid or expired link.");
    }

    const grievance = rows[0];
    const now = new Date();

    if (now > new Date(grievance.expiry_time)) {
      return res.send("<h2>TIME END</h2>");
    }
    const API_KEY = process.env.VITE_API_KEY;

    res.render("Resolution", { grievance, token, API_KEY });
  } catch (error) {
    console.error("Error in GET /:token:", error.message);
    res.status(500).send("Internal server error.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

router.post("/:token", async (req, res) => {
  const { token } = req.params;
  const { status } = req.body;
  let connection;

  try {
    if (!["resolved", "rejected"].includes(status)) {
      return res.status(400).send("Invalid status value.");
    }

    connection = await getConnection();

    const [rows] = await connection.query(
      `SELECT * FROM form WHERE resolution_token = ?`,
      [token]
    );

    if (rows.length === 0) {
      return res.status(404).send("Invalid token.");
    }

    const grievance = rows[0];
    const now = new Date();

    if (now > new Date(grievance.expiry_time)) {
      return res.send("<h2>TIME END</h2>");
    }

    await connection.query(
      `UPDATE form SET Application_Status = ? WHERE resolution_token = ?`,
      [status, token]
    );

    res.send(
      `<h3>Status updated to: <strong>${status.toUpperCase()}</strong></h3>`
    );
  } catch (error) {
    console.error("Error in POST /:token:", error.message);
    res.status(500).send("Internal server error.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;
