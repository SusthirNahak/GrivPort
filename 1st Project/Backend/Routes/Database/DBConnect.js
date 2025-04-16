
const mysql = require("mysql2/promise");
require('dotenv').config();

console.log({
    host: process.env.hostname,
    user: process.env.USERNAME,
    password: process.env.password,
    database: process.env.pathname
});


// Function to create and return a connection
async function getConnection() {

    return await mysql.createConnection({
        host: process.env.hostname,
        user: 'WilyFox',
        password: process.env.password,
        database: process.env.pathname,
        multipleStatements: true,
    });
}



module.exports = { getConnection };