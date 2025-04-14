const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// Function to create and return a connection
async function getConnection() {
    return await mysql.createConnection({
        host: "localhost",
        user: "WilyFox",
        password: "WilyFox@12345",
        database: "WilyFox",
        multipleStatements: true,
    });
}

// Endpoint to check and create database, table, and insert data
router.post("/TicketRaiseReason", async (req, res) => {

    console.log("Body: ", req.body);

    const { ticketRaiseReason, Application_Id } = req.body;
    console.log("Ticket Raise Reason: ", ticketRaiseReason);
    console.log(typeof (ticketRaiseReason));

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();
        console.log("Connected to MySQL: " + connection.threadId);

        // Step 2: Create UPDATE query
        const insertDataQuery = `UPDATE form SET User_Ticket_Raise_Message = ?, Application_Status = 'Raised' WHERE Application_Id = ?;`;

        // Step 3: Execute query
        const [results] = await connection.execute(insertDataQuery, [ticketRaiseReason, Application_Id]);
        console.log("Query executed successfully:", results);

        // Step 4: Respond to client
        if (results.affectedRows > 0) {
            console.log("Data updated successfully");

            res.status(200).send({
                success: true,
                data: results,
                message: "Data updated successfully",
            });
        } else {
            console.log("Record not found or not updated");

            res.status(404).send({
                success: false,
                message: "Record not found or not updated",
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
