
const { getConnection } = require('./DBConnect');

async function CreateDatabase() {

  const dbName = "WilyFox";
  const tableName = "Form";

  let connection;

  try {
    // Step 1: Create connection
    connection = await getConnection();

    // Step 3: Select the database
    await connection.query(`USE ${dbName}`);;

    // Step 4: Check if the table exists, and create it if it doesn't
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Application_Id VARCHAR(255),
        User_Id VARCHAR(255) NOT NULL,
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
        resolution_token VARCHAR(255),
        expiry_time DATETIME,
        Application_Status ENUM('pending', 'resolved', 'rejected', 'process') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await connection.query(createTableQuery);

    const adminTableCreateQuery = `CREATE TABLE IF NOT EXISTS AdminData (id INT AUTO_INCREMENT PRIMARY KEY, FirstName VARCHAR(255) NULL, LastName VARCHAR(255) NULL,Email VARCHAR(255) NOT NULL UNIQUE, Password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

    await connection.query(adminTableCreateQuery);

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

    const insertAdminTableQuery = `INSERT IGNORE INTO AdminData (FirstName, LastName, Email, Password) VALUES 
      ('John', 'Doe', 'johndoe@example.com', 'password123'),
      ('Jane', 'Smith', 'janesmith@example.com', 'password456'),
      ('Emily', 'Johnson', 'emilyjohnson@example.com', 'password789'),
      ('Michael', 'Brown', 'michaelbrown@example.com', 'password101'),
      ('j', 'j', 'j@j.com', 'john');
    `;

    await connection.query(insertAdminTableQuery);

  } catch (err) {
    console.error("Error:", err.stack || err.message);
  } finally {
    // Close the connection
    if (connection) {
        connection.release();
    }
}
}

module.exports = CreateDatabase;