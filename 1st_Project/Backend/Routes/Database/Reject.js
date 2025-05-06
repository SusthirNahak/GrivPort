const express = require("express");
const router = express.Router();
const { getConnection } = require('./DBConnect');

router.post("/RejectData", async (req, res) => {

    const { id, reason } = req.body;

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();

        // Step 2: Create UPDATE query
        const insertDataQuery = `UPDATE form SET Review_Message = ?, Application_Status = 'Rejected'  WHERE Application_Id = ?;`;

        // Step 3: Execute query
        const [results] = await connection.execute(insertDataQuery, [reason, id]);

        // Step 4: Respond to client
        if (results.affectedRows > 0) {
            
            res.status(200).send({
                success: true,
                message: "Reject updated successfully",
            });
        } else {

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
            connection.release();
        }
    }
});

module.exports = router;
