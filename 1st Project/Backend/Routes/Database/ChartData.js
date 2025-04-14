const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const { Application } = require("twilio/lib/twiml/VoiceResponse");

async function getConnection() {
    return await mysql.createConnection({
        host: "localhost",
        user: "WilyFox",
        password: "WilyFox@12345",
        database: "WilyFox",
        multipleStatements: true,
    });
}

router.get("/ChartData", async (req, res) => {
    let connection;

    try {
        connection = await getConnection();
        console.log("Connected to MySQL: " + connection.threadId);

        const query = `
            SELECT Application_Status, COUNT(*) AS count 
            FROM form 
            WHERE Application_Status IN ('Completed', 'Pending', 'Process', 'Rejected', 'Ticket Raised') 
            GROUP BY Application_Status;
        `;

        const [results] = await connection.execute(query);

        // Match the exact case from database
        const statusCounts = {
            'Completed': 0,
            'Pending': 0,
            'Process': 0,
            'Rejected': 0,
            'Ticket Raised': 0
        };

        // Map results directly without case conversion
        results.forEach(row => {
            if (statusCounts.hasOwnProperty(row.Application_Status)) {
                statusCounts[row.Application_Status] = row.count;
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
                await connection.end();
                console.log("MySQL connection closed.");
            } catch (endErr) {
                console.error("Error closing connection:", endErr);
            }
        }
    }
});

module.exports = router;