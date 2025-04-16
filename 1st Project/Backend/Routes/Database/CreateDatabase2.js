const express = require("express");
// const mysql = require("mysql2");
const router = express.Router();
const { upload, fileData } = require("./FileDatas"); // Import upload and fileData from FileDatas.js

// {
//   // const createConnection = require("./dbConnection");

//   // Create a connection to the MySQL database (adjust these credentials)
//   const connection = mysql.createConnection({
//     host: "localhost", // Your MySQL host
//     user: "root", // Your MySQL username
//     password: "", // Your MySQL password
//     multipleStatements: true, // Allows multiple queries in one statement
//   });

//   // Connect to MySQL
//   connection.connect((err) => {
//     if (err) {
//       console.error("Error connecting to MySQL:", err.stack);
//       return;
//     }
//     console.log("Connected to MySQL as id " + connection.threadId);
//   });

//   // Endpoint to check and create database, table, and insert data
//   router.post("/userFormData", (req, res) => {
//     const dbName = "wilyFox";
//     const tableName = "Form";

//     // Step 1: Check if the database exists, and create it if it doesn't
//     const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${dbName};`;

//     connection.query(createDbQuery, (err, result) => {
//       if (err) {
//         return res.status(500).send("Error creating database: " + err.message);
//       }
//       console.log("Database checked/created successfully.");

//       // Step 2: Select the database
//       const useDbQuery = `USE ${dbName};`;

//       connection.query(useDbQuery, (err) => {
//         if (err) {
//           return res
//             .status(500)
//             .send("Error selecting database: " + err.message);
//         }

//         // Step 3: Check if the table exists, and create it if it doesn't
//         const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS ${tableName} (
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           Grievance VARCHAR(255),
//           Name VARCHAR(255),
//           State VARCHAR(255),
//           District VARCHAR(255),
//           Block VARCHAR(255),
//           GP VARCHAR(255),
//           Village TEXT,
//           Address VARCHAR(255),
//           Gender VARCHAR(50),
//           Disability VARCHAR(255),
//           Email VARCHAR(255)
//         );
//       `;

//         connection.query(createTableQuery, (err, result) => {
//           if (err) {
//             return res.status(500).send("Error creating table: " + err.message);
//           }
//           console.log("Table checked/created successfully.");

//           let formData = req.body;
//           console.log("formData: ", formData);

//           // Step 4: Insert data into the table if it exists
//           const insertDataQuery = `
//             INSERT INTO ${tableName} (Grievance, Name, State, District, Block, GP, Village, Address, Gender, Disability, Email)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//           `;

//           console.log("inside insert query");

//           const values = [
//             formData.Grievance,
//             formData.Name,
//             formData.State,
//             formData.District,
//             formData.Block,
//             formData.GP,
//             formData.Village,
//             formData.Address,
//             formData.Gender,
//             formData.Disability,
//             formData.Email,
//           ];
//           console.log("inside insert query2");
//           connection.query(insertDataQuery, values, (err, result) => {
//             if (err) {
//               return res.status(500).send({
//                 success: false,
//                 error: "Error inserting data: " + err.message,
//               });
//             }
//             console.log("inside insert query3");
//             res.status(200).send({
//               success: true,
//               message: "Data are successfully set up!",
//             });
//           });
//         });
//       });
//     });
//   });

// }

const mysql = require("mysql2/promise");

function applicationId() {
  const part1 = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");

  // Next 5 characters: Digits 0-9
  const part2 = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  // Last 4 characters: Lowercase a-z or digits 0-9
  const part3 = Array.from({ length: 4 }, () => {
    const charType = Math.random() < 0.5 ? "letter" : "digit";
    return charType === "letter"
      ? String.fromCharCode(97 + Math.floor(Math.random() * 26)) // Lowercase letter
      : Math.floor(Math.random() * 10); // Digit
  }).join("");

  // Concatenate all parts
  return part1 + part2 + part3;
}

// Function to create and return a connection
async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "WilyFox",
    password: "WilyFox@12345",
    multipleStatements: true,
  });
}

// Endpoint to check and create database, table, and insert data
router.post("/userFormData", upload.array("Files"), async (req, res) => {
  // console.log("Content-Type:", req.headers["content-type"]);
  const files = req.files;
  // console.log("files: ", files);

  if (!files) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const dbName = "wilyFox";
  const tableName = "Form";

  let connection;

  try {
    // Step 1: Create connection
    connection = await getConnection();
    console.log("Connected to MySQL: " + connection.threadId);

    // Step 2: Check if the database exists, and create it if it doesn't
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log("Database checked/created successfully.");

    // Step 3: Select the database
    await connection.query(`USE ${dbName}`);
    console.log("Database selected successfully.");

    // Step 4: Check if the table exists, and create it if it doesn't
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Application_Id VARCHAR(255),
        Application_Status VARCHAR(255),
        Grievance VARCHAR(255),
        Name VARCHAR(255),
        State VARCHAR(255),
        District VARCHAR(255),
        Block VARCHAR(255),
        GP VARCHAR(255),
        Village TEXT,
        Address VARCHAR(255),
        Gender VARCHAR(50),
        Disability VARCHAR(255),
        Email VARCHAR(255),
        Message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

      );
    `;
    await connection.query(createTableQuery);
    console.log("Table checked/created successfully.");

    // Step 5: Insert data into the table
    const formData = req.body;
    // const files = req.files;
    console.log("formData: ", formData);
    console.log("files: ", files);

    const id = applicationId();

    const insertDataQuery = `
      INSERT INTO ${tableName} (Application_Id, Application_Status, Grievance, Name, State, District, Block, GP, Village, Address, Gender, Disability, Email, Message)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      id,
      "Pending",
      formData.Grievance,
      formData.Name,
      formData.State,
      formData.District,
      formData.Block,
      formData.GP,
      formData.Village,
      formData.Address,
      formData.Gender,
      formData.Disability,
      formData.Email,
      formData.Message
    ];

    if (
      (await connection.query(insertDataQuery, values)) &&
      (await fileData(connection, files, id))
    ) {
      // Send success response
      return res.status(200).json({
        success: true,
        message: "Data Submited Successfully",
        applicationId: id,
      });
    } else {
      // Send failed response
      res.status(500).json({
        success: false,
        message: "Data Submition Failed",
      });
    }
  } catch (err) {
    console.error("Error:", err.stack || err.message);
    res.status(500).send({
      success: false,
      error: `Error: ${err.message}`,
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




