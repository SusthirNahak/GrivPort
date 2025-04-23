const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../../uploads/");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
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

async function fileData(connection, files, applicationId) {
  const tableName = "Files";

  try {
    const createFileQuery = `
		  CREATE TABLE IF NOT EXISTS ${tableName} (
			File_Id INT AUTO_INCREMENT PRIMARY KEY,
			Application_Id VARCHAR(255),
			File_Path VARCHAR(255),
			File_Name VARCHAR(255),
			File_Type VARCHAR(100),
			File_Size INT
		  );
		`;
    await connection.query(createFileQuery);

    const insertDataQuery = `
		  INSERT INTO ${tableName} (Application_Id, File_Name, File_Path, File_Type, File_Size)VALUES (?, ?, ?, ?, ?);
		`;

    for (const file of files) {
      const values = [
        applicationId,
        file.originalname,
        file.path,
        file.mimetype,
        file.size,
      ];
      await connection.query(insertDataQuery, values);
    }
    return true;
  } catch (err) {
    console.error("Error:", err.stack || err.message);
    return false;
  }
}

module.exports = {
  upload,
  fileData,
};
