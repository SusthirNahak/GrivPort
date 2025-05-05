const express = require("express");
const router = express.Router();
const { getConnection } = require('./DBConnect');
const multer = require('multer');

router.post("/UpdateLocation", multer().none(), async (req, res) => {

    const { state, district, block, gp, village } = req.body;

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();

        // Step 2: Create UPDATE query
        const insertDataQuery = `INSERT INTO locationset(state, district, block, gp, village)
                                    VALUES (?, ?, ?, ?, ?)
                                    ON DUPLICATE KEY UPDATE
                                    state = VALUES(state), district = VALUES(district), block = VALUES(block), gp = VALUES(gp), village = VALUES(village);
                                `;

        // Step 3: Execute query
        const [results] = await connection.execute(insertDataQuery, [state, district, block, gp, village]);

        // Step 4: Respond to client
        if (results.affectedRows > 0) {

            res.status(200).send({
                success: true,
                message: "Data Insertion successfully",
            });
        } else {

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
            connection.release();
        }
    }
});

router.get("/UpdateLocation", multer().none(), async (req, res) => {

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();

        const getDataQuery = `SELECT * FROM locationset ORDER BY id ASC;`;

        // Step 3: Execute query
        const [getDataResults] = await connection.execute(getDataQuery);

        // Step 4: Respond to client
        if (getDataResults.length > 0) {
            res.status(200).send({
                success: true,
                message: "Data Fetch successfully",
                data: getDataResults
            });
        } else {
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
            connection.release();
        }
    }
});

router.put("/UpdateLocation", multer().none(), async (req, res) => {

    const { id, state, district, block, gp, village } = req.body;

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();

        // Step 2: Create UPDATE query
        const updateDataQuery = `UPDATE locationset SET state = ?, district = ?, block = ?, gp = ?, village = ? wHERE id = ?;`;

        // Step 3: Execute query
        const [updateResults] = await connection.execute(updateDataQuery, [state, district, block, gp, village, id]);

        // Step 4: Respond to client
        if (updateResults.affectedRows > 0) {

            res.status(200).send({
                success: true,
                message: "Data Updation successfully",
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Data Updation unsuccessfull",
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

router.delete("/UpdateLocation", multer().none(), async (req, res) => {

    const { id } = req.body;

    let connection;

    try {
        // Step 1: Create connection
        connection = await getConnection();

        // Step 2: Create UPDATE query
        const deleteDataQuery = `DELETE FROM locationset WHERE id = ?;`;

        // Step 3: Execute query
        const [deleteResults] = await connection.execute(deleteDataQuery, [id]);

        // Step 4: Respond to client
        if (deleteResults.affectedRows > 0) {

            res.status(200).send({
                success: true,
                message: "Data Deletion successfully",
            });
        } else {

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
            connection.release();
        }
    }
});

module.exports = router;
