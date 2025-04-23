const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const { getConnection } = require('./DBConnect');

// Ensure the uploads folder exists
const uploadDir = path.join(__dirname, "../../uploads/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

console.log("Upload directory:", uploadDir);

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) return cb(err);
      cb(null, uploadDir);
    });
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }); // Configure Multer to handle multiple files

// Generate unique Application ID
function applicationId() {
  const part1 = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");

  const part2 = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  const part3 = Array.from({ length: 4 }, () => {
    const charType = Math.random() < 0.5 ? "letter" : "digit";
    return charType === "letter"
      ? String.fromCharCode(97 + Math.floor(Math.random() * 26))
      : Math.floor(Math.random() * 10);
  }).join("");

  return part1 + part2 + part3;
}

// Endpoint to handle form data and file uploads
router.post("/userFormData", upload.array("Files"), async (req, res) => {
  const files = req.files;

  if (!files) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const dbName = "WilyFox";
  const tableName = "Form";
  let connection;

  try {
    // Step 1: Create connection
    connection = await getConnection();
    console.log("Connected to MySQL: " + connection.threadId);

    // Step 2: Check if the database exists, and create it if it doesn't
    // await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log("Database checked/created successfully.");

    // Step 3: Select the database
    await connection.query(`USE ${dbName}`);
    console.log("Database selected successfully.");

    // Step 4: Check if the table exists, and create it if it doesn't
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Application_Id VARCHAR(255),
        User_Id VARCHAR(255) NOT NULL,
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
        User_Ticket_Raise_Message VARCHAR(255),
        File_Names TEXT,
        File_Paths TEXT,
        File_Types TEXT,
        File_Sizes TEXT,
        Review_Message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await connection.query(createTableQuery);
    console.log("Table checked/created successfully.");

    const adminTableCreateQuery = `CREATE TABLE IF NOT EXISTS AdminData (id INT AUTO_INCREMENT PRIMARY KEY, FirstName VARCHAR(255) NULL, LastName VARCHAR(255) NULL,Email VARCHAR(255) NOT NULL UNIQUE, Password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

    await connection.query(adminTableCreateQuery);
    console.log("Admin Table checked/created successfully.");

    const adminLocationCreateQuery = `CREATE TABLE IF NOT EXISTS locationset (
      id INT AUTO_INCREMENT PRIMARY KEY,
      state VARCHAR(100) NOT NULL,
      district VARCHAR(100) NOT NULL,
      block VARCHAR(100) NOT NULL,
      gp VARCHAR(100) NOT NULL,
      village VARCHAR(100) NOT NULL,
      UNIQUE (state, district, block, gp, village)
    );`

    await connection.query(adminLocationCreateQuery);
    console.log("Admin Location Table checked/created successfully.");

    // Step 5: Prepare file data as JSON strings
    const formData = req.body;
    console.log("formData: ", formData);
    console.log("files: ", files);

    const id = applicationId();

    // Extract file information into arrays
    const fileNames = files.map(file => file.originalname);
    const filePaths = files.map(file => file.path);
    const fileTypes = files.map(file => file.mimetype);
    const fileSizes = files.map(file => file.size);

    // Convert arrays to JSON strings for storage
    const fileNamesJson = JSON.stringify(fileNames);
    const filePathsJson = JSON.stringify(filePaths);
    const fileTypesJson = JSON.stringify(fileTypes);
    const fileSizesJson = JSON.stringify(fileSizes);

    // Step 6: Insert data into the table
    const insertDataQuery = `
      INSERT INTO ${tableName} (
        Application_Id, User_Id, Application_Status, Grievance, Name, State, District, Block, GP, Village, Address, Gender, Disability, Email, Message, User_Ticket_Raise_Message, File_Names, File_Paths, File_Types, File_Sizes, Review_Message
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
      id,
      formData.Phone_Number,
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
      formData.Message,
      'NULL',
      fileNamesJson,
      filePathsJson,
      fileTypesJson,
      fileSizesJson,
      'NULL'
    ];

    await connection.query(insertDataQuery, values);
    console.log("Data and files inserted successfully");

    const insertAdminTableQuery = `INSERT IGNORE INTO AdminData (FirstName, LastName, Email, Password) VALUES 
      ('John', 'Doe', 'johndoe@example.com', 'password123'),
      ('Jane', 'Smith', 'janesmith@example.com', 'password456'),
      ('Emily', 'Johnson', 'emilyjohnson@example.com', 'password789'),
      ('Michael', 'Brown', 'michaelbrown@example.com', 'password101'),
      ('j', 'j', 'j@j.com', 'john');
    `;

    await connection.query(insertAdminTableQuery);
    console.log("Admin Data and files inserted successfully");

    return res.status(200).json({
      success: true,
      message: "Data Submitted Successfully",
      applicationId: id,
    });
  } catch (err) {
    console.error("Error:", err.stack || err.message);
    res.status(500).send({
      success: false,
      error: `Error: ${err.message}`,
    });
  } finally {
    if (connection) {
      await connection.end();
      console.log("MySQL connection closed.");
    }
  }
});

module.exports = router;