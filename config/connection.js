import "dotenv/config";
import mysql from "mysql2";

// Create database connection
const database = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
  },
  console.log("Welcome to the company database!")
);

export default database;
