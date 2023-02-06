import database from "../config/connection.js";

// plain Text Query variables
const getDepartments = "SELECT name FROM department";
const getRoles = "SELECT title FROM role";
const getManagers =
  "SELECT first_name, last_name FROM employee WHERE manager_id is NULL";
const getEmployees = "SELECT first_name, last_name FROM employee";
