import database from "../config/connection.js";

// Plain Text Query variables
const getDepartments = "SELECT name FROM department";
const getRoles = "SELECT title FROM role";
const getManagers =
  "SELECT first_name, last_name FROM employee WHERE manager_id is NULL";
const getEmployees = "SELECT first_name, last_name FROM employee";

const viewDepartments =
  "SELECT department.id AS 'ID', department.name AS 'Name' FROM department";
const viewRoles =
  "SELECT role.id AS 'ID', role.title AS 'Title', role.salary AS 'Salary', department.name AS 'Department' FROM role JOIN department ON role.department_id = department.id;";
const viewEmployees =
  "SELECT a.id AS 'ID', a.first_name AS 'First Name', a.last_name AS 'Last Name', role.title AS 'Job Title', department.name AS 'Department', role.salary AS 'Salary', CONCAT(b.first_name, ' ', b.last_name) AS 'Manager' FROM employee a JOIN role ON a.role_id = role.id JOIN department ON role.department_id = department.id LEFT OUTER JOIN employee b ON a.manager_id = b.id ORDER BY a.id;";

// MySQL query function
export default function databaseQuery(sql) {
  return new Promise((resolve, reject) => {
    database.query(sql, (err, results) => {
      err ? reject(err) : resolve(results);
    });
  });
}

export {
  getDepartments,
  getRoles,
  getManagers,
  getEmployees,
  viewDepartments,
  viewRoles,
  viewEmployees,
};
