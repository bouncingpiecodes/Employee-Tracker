import "dotenv/config";
import mysql from "mysql2";

// create database connection
const database = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("welcome to the emplyee tracker database!")
);

export default database;
