const express = require("express");
const router = express.Router();
const { getConnection } = require('./DBConnect');

// Endpoint to check and create database, table, and insert data
router.post("/RejectData", async (req, res) => {

    console.log("Body: ", req.body);

    const { id, reason } = req.body;
    console.log("Received ID: ", id);
    console.log(typeof(id));

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();
        console.log("Connected to MySQL: " + connection.threadId);

        // Step 2: Create UPDATE query
        const insertDataQuery = `UPDATE form SET Review_Message = ?, Application_Status = 'Rejected'  WHERE Application_Id = ?;`;

        // Step 3: Execute query
        const [results] = await connection.execute(insertDataQuery, [reason, id]);
        console.log("Query executed successfully:", results);

        // Step 4: Respond to client
        if (results.affectedRows > 0) {
            console.log("Reject updated successfully");
            
            res.status(200).send({
                success: true,
                message: "Reject updated successfully",
            });
        } else {
            console.log("Reject not  updated");

            res.status(404).send({
                success: false,
                message: "Reject not updated",
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
            await connection.end();
            console.log("MySQL connection closed.");
        }
    }
});

module.exports = router;
