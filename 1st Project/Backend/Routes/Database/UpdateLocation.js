const express = require("express");
const router = express.Router();
const { getConnection } = require('./DBConnect');
const multer = require('multer');


// Endpoint to check and create database, table, and insert data
router.post("/UpdateLocation", multer().none(), async (req, res) => {

    console.log("Body: ", req.body);
    const { state, district, block, gp, village } = req.body;

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();
        console.log("Connected to MySQL: " + connection.threadId);

        // Step 2: Create UPDATE query
        const insertDataQuery = `INSERT INTO locationset(state, district, block, gp, village)
                                    VALUES (?, ?, ?, ?, ?)
                                    ON DUPLICATE KEY UPDATE
                                    state = VALUES(state), district = VALUES(district), block = VALUES(block), gp = VALUES(gp), village = VALUES(village);
                                `;

        // Step 3: Execute query
        const [results] = await connection.execute(insertDataQuery, [state, district, block, gp, village]);
        console.log("Query executed successfully:", results);

        // Step 4: Respond to client
        if (results.affectedRows > 0) {
            console.log("Data Insertion successfully");

            res.status(200).send({
                success: true,
                message: "Data Insertion successfully",
            });
        } else {
            console.log("Data Insertion unsuccessfull");

            res.status(404).send({
                success: false,
                message: "Data Insertion unsuccessfull",
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

router.get("/UpdateLocation", multer().none(), async (req, res) => {

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();
        console.log("Connected to MySQL: " + connection.threadId);

        const getDataQuery = `SELECT * FROM locationset ORDER BY id ASC;`;

        // Step 3: Execute query
        const [getDataResults] = await connection.execute(getDataQuery);
        console.log("Query executed successfully:", getDataResults);

        // Step 4: Respond to client
        if (getDataResults.length > 0) {
            console.log("Data Fetch successfully");

            res.status(200).send({
                success: true,
                message: "Data Fetch successfully",
                data: getDataResults
            });
        } else {
            console.log("Data Fetch unsuccessfull");

            res.status(404).send({
                success: false,
                message: "Data Fetch unsuccessfull",
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

router.put("/UpdateLocation", multer().none(), async (req, res) => {

    console.log("Body: ", req.body);
    const { id, state, district, block, gp, village } = req.body;

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();
        console.log("Connected to MySQL: " + connection.threadId);

        console.log("done 1");


        // Step 2: Create UPDATE query
        const updateDataQuery = `UPDATE locationset SET state = ?, district = ?, block = ?, gp = ?, village = ? wHERE id = ?;`;

        console.log("done 2");

        // Step 3: Execute query
        const [updateResults] = await connection.execute(updateDataQuery, [state, district, block, gp, village, id]);
        console.log("Query executed successfully:", updateResults);
        console.log("done 3");

        // Step 4: Respond to client
        if (updateResults.affectedRows > 0) {
            console.log("Data Updation successfully");

            res.status(200).send({
                success: true,
                message: "Data Updation successfully",
            });
        } else {
            console.log("Data Updation unsuccessfull");

            res.status(404).send({
                success: false,
                message: "Data Updation unsuccessfull",
            });
        }
        console.log("done 4");

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

router.delete("/UpdateLocation", multer().none(), async (req, res) => {

    console.log("Body: ", req.body);
    const { id } = req.body;

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();
        console.log("Connected to MySQL: " + connection.threadId);

        // Step 2: Create UPDATE query
        const deleteDataQuery = `DELETE FROM locationset WHERE id = ?;`;

        // Step 3: Execute query
        const [deleteResults] = await connection.execute(deleteDataQuery, [id]);
        console.log("Query executed successfully:", deleteResults);

        // Step 4: Respond to client
        if (deleteResults.affectedRows > 0) {
            console.log("Data Deletion successfully");

            res.status(200).send({
                success: true,
                message: "Data Deletion successfully",
            });
        } else {
            console.log("Data Deletion unsuccessfull");

            res.status(404).send({
                success: false,
                message: "Data Deletion unsuccessfull",
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
