const express = require("express");
const router = express.Router();
const { Application } = require("twilio/lib/twiml/VoiceResponse");
const { getConnection } = require('./DBConnect');

router.get("/ChartData", async (req, res) => {
    let connection;

    try {
        connection = await getConnection();

        const query = `
            SELECT Application_Status, COUNT(*) AS count FROM form WHERE Application_Status COLLATE utf8mb4_general_ci IN ('completed', 'pending', 'process', 'rejected', 'raised') GROUP BY Application_Status;

        `;

        const [results] = await connection.execute(query);

        const statusCounts = {
            'completed': 0,
            'pending': 0,
            'process': 0,
            'rejected': 0,
            'ticket raised': 0
        };
        
        results.forEach(row => {
            let status = row.Application_Status.toLowerCase();
            
            if (status === 'raised') {
                status = 'ticket raised';
            }
            
            if (statusCounts.hasOwnProperty(status)) {
                statusCounts[status] = row.count;
            }
        });
        
        const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

        res.status(200).send({
            success: true,
            data: [statusCounts, total],
            message: "Chart data fetched successfully",
        });

    } catch (err) {
        console.error("Error:", err.stack || err.message);
        res.status(500).send({
            success: false,
            error: `Server Error: ${err.message}`,
        });
    } finally {
        if (connection) {
            try {
            connection.release();
            } catch (endErr) {
                console.error("Error closing connection:", endErr);
            }
        }
    }
});

module.exports = router;