
const mysql = require("mysql2/promise");
require('dotenv').config();
const dbUrl = process.env.DATABASE_URL;

// Parse the URL using URL class (Node.js v10+)
const { hostname, pathname, username, password, port } = new URL(dbUrl);


// Function to create and return a connection
async function getConnection() {
    // return await mysql.createConnection({
    //     host: "localhost",
    //     user: "WilyFox",
    //     password: "WilyFox@12345",
    //     database: "WilyFox",
    //     multipleStatements: true,
    // });
    return await mysql.createConnection({
        host: hostname,
        user: username,
        password: password,
        database: pathname.replace('/', ''),
        port: port || 3306,
      });
}



module.exports = { getConnection };