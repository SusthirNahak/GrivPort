const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const { getConnection } = require('./DBConnect');

const uploadDir = path.join(__dirname, "../../uploads/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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

const upload = multer({ storage });

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

router.post("/userFormData", upload.array("Files"), async (req, res) => {
  const files = req.files;
  const formData = req.body;

  if (!files) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const dbName = "WilyFox";
  const tableName = "Form";
  let connection;

  try {
    // Step 1: Create connection
    connection = await getConnection();

    // Step 3: Select the database
    await connection.query(`USE ${dbName}`);;

    // Step 5: Prepare file data as JSON strings
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

    if (await connection.query(insertDataQuery, values)) {

      return res.status(200).json({
        success: true,
        message: "Data Submitted Successfully",
        applicationId: id,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Data Submitted Unsuccessful",
      });
    }
  } catch (err) {
    console.error("Error:", err.stack || err.message);
    res.status(500).send({
      success: false,
      error: `Error: ${err.message}`,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;