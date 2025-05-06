const express = require("express");
const router = express.Router();
const { getConnection } = require('./DBConnect');

router.post("/TicketRaiseReason", async (req, res) => {

    const { ticketRaiseReason, Application_Id } = req.body;

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();

        // Step 2: Create UPDATE query
        const insertDataQuery = `UPDATE form SET User_Ticket_Raise_Message = ?, Application_Status = 'Raised' WHERE Application_Id = ?;`;

        // Step 3: Execute query
        const [results] = await connection.execute(insertDataQuery, [ticketRaiseReason, Application_Id]);

        // Step 4: Respond to client
        if (results.affectedRows > 0) {
            res.status(200).send({
                success: true,
                data: results,
                message: "Data updated successfully",
            });
        } else {
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
            connection.release();
        }
    }
});

module.exports = router;
