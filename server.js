// Import Modules and files
import inquirer from 'inquirer';
import cTable from 'console.table';
import database from './config/connection.js';
import databaseQuery from './helper-files/queries.js';
import * as query from './helper-files/queries.js';

// Async funtion for Inquirer 
async function userInterface() {
    console.log('-------------');

    // Pull choice lists from database for Inquirer prompt
    let departmentList = await databaseQuery(query.getDepartments);
    let roleList = await databaseQuery(query.getRoles);
    let managerList = await databaseQuery(query.getManagers);
    let employeeList = await databaseQuery(query.getEmployees);


    // Format choice lists for Inquirer prompt
    roleList = roleList.map(item => {return {name: item.title}});        
    managerList = managerList.map(item => {return {name: `${item.first_name} ${item.last_name}`}});
    managerList.push({name: 'No Manager'});
    employeeList = employeeList.map(item => {return {name: `${item.first_name} ${item.last_name}`}});

    // Inquirer function
    await inquirer.prompt([
        {
            type: 'rawlist',
            message: 'What would you like to do?',
            name: 'actionChoice',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        },
        {
            type: 'input',
            message: "Please enter the name of the new Department:",
            name: 'newDepartment',
            when: (answers) => answers.actionChoice === 'Add a Department',
        },
        {
            type: 'input',
            message: "Please enter the Name of the new Role:",
            name: 'newRole',
            when: (answers) => answers.actionChoice === 'Add a Role',
        },
        {
            type: 'input',
            message: "Please enter the Salary for the new Role (in US Dollars):",
            name: 'newRoleSalary',
            validate: (answer) => {return (isNaN(answer)) ? "please enter a number" : true},
            when: (answers) => answers.actionChoice === 'Add a Role',
        },
        {
            type: 'rawlist',
            message: "Which Department is the new Role in?",
            name: 'newRoleDepartment',
            choices: departmentList,
            when: (answers) => answers.actionChoice === 'Add a Role',
        },
        {
            type: 'input',
            message: "Please enter the First Name of the new Employee:",
            name: 'newEmployeeFirstName',
            when: (answers) => answers.actionChoice === 'Add an Employee',
        },
        {
            type: 'input',
            message: "Please enter the Last Name of the new Employee:",
            name: 'newEmployeeLastName',
            when: (answers) => answers.actionChoice === 'Add an Employee',
        },
        {
            type: 'rawlist',
            message: "What is the new Employee's Role?",
            name: 'newEmployeeRole',
            choices: roleList,
            when: (answers) => answers.actionChoice === 'Add an Employee',
        },
        {
            type: 'rawlist',
            message: "Who is the new Employee's Manager?",
            name: 'newEmployeeManager',
            choices: managerList,
            when: (answers) => answers.actionChoice === 'Add an Employee',
        },
        {
            type: 'rawlist',
            message: "Which Employee's Role do you want to update?",
            name: 'updateEmployee',
            choices: employeeList,
            when: (answers) => answers.actionChoice === 'Update an Employee Role',
        },
        {
            type: 'rawlist',
            message: "What is the Employee's new Role?",
            name: 'updateEmployeeRole',
            choices: roleList,
            when: (answers) => answers.actionChoice === 'Update an Employee Role',
        }
    ])
    .then((answers) => {
        useAnswers(answers);
    });
};

// Function to display tables
const tableDisplay = async (answers) => {
    let displayTable;
    if (answers.actionChoice === "View all Departments") {
        displayTable = await databaseQuery(query.viewDepartments);
    } else if (answers.actionChoice === "View all Roles") {
        displayTable = await databaseQuery(query.viewRoles);
    } else if (answers.actionChoice === "View all Employees") {
        displayTable = await databaseQuery(query.viewEmployees);
    };
    console.log('');
    console.table(displayTable);
    console.log('-------------');
};

// Function to update the database based on user input
const updateDatabase = async (answers) => {
    // If user chose to Add Department
    if (answers.actionChoice === "Add a Department") {
        await databaseQuery(`INSERT INTO department (name) VALUES  ("${answers.newDepartment}")`)
        console.log(`New Department "${answers.newDepartment}" added.`)
    } 
     // If User chose to Add Role
    else if (answers.actionChoice === "Add a Role") {
        let newRoleDepartment = await databaseQuery(`SELECT id FROM department WHERE name = "${answers.newRoleDepartment}";`);
        newRoleDepartment = newRoleDepartment[0].id;
        await databaseQuery(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.newRole}", "${answers.newRoleSalary}", "${newRoleDepartment}")`);
        console.log(`New Role "${answers.newRole}" added.`);
    } 
    // If user chose to Add Employee
    else if (answers.actionChoice === "Add an Employee") {
        // Work for Role value
        let newEmployeeRoleID = await databaseQuery(`SELECT id FROM role WHERE title = "${answers.newEmployeeRole}";`);
        newEmployeeRoleID = newEmployeeRoleID[0].id;
        // Work for Manager ID value
        let newEmployeeManagerID;
        if (answers.newEmployeeManager === "No Manager") {
            // Write new Employee with no manager
            await databaseQuery(`INSERT INTO employee (first_name, last_name, role_id) VALUES ("${answers.newEmployeeFirstName}", "${answers.newEmployeeLastName}", ${newEmployeeRoleID});`);
        } else {
            const managerNameArray = answers.newEmployeeManager.split(' ');
            newEmployeeManagerID = await databaseQuery(`SELECT id FROM employee WHERE first_name = "${managerNameArray[0]}" AND last_name = "${managerNameArray[1]}"`);
            newEmployeeManagerID = newEmployeeManagerID[0].id;
             // Write new Employee to database
            await databaseQuery(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answers.newEmployeeFirstName}", "${answers.newEmployeeLastName}", ${newEmployeeRoleID}, ${newEmployeeManagerID});`);
        };
        console.log(`New Employee "${answers.newEmployeeFirstName} ${answers.newEmployeeLastName}" added.`);
    }
    // If user chose to Update Employee
    else if (answers.actionChoice === "Update an Employee Role") {
        // Work for role value
        let updateEmployeeRoleID = await databaseQuery(`SELECT id FROM role WHERE title = "${answers.updateEmployeeRole}";`);
        updateEmployeeRoleID = updateEmployeeRoleID[0].id;
        // Work to get Employee ID
        let updateEmployeeID;
        const employeeNameArray = answers.updateEmployee.split(' ');
        updateEmployeeID = await databaseQuery(`SELECT id FROM employee WHERE first_name = "${employeeNameArray[0]}" AND last_name = "${employeeNameArray[1]}"`);
        updateEmployeeID = updateEmployeeID[0].id;
        // Write update Employee role to database
        await databaseQuery(`UPDATE employee SET role_id = "${updateEmployeeRoleID}" WHERE id = "${updateEmployeeID}";`);
        console.log(`Role of Employee "${answers.updateEmployee}" updated to "${answers.updateEmployeeRole}".`);
    }
};

// Function response to user input
const useAnswers = async (answers) => {
    await tableDisplay(answers);
    await updateDatabase(answers);
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Would you like to do anything else?',
            name: 'promptAgain'
        }
    ])
    .then((again) => {
        if (again.promptAgain) {
            userInterface();
        } else {
            console.log('Ending program. Have a nice day!');
            process.exit(0);
        };
    });
};

// Call database connection and run User Interface
database.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    };
    userInterface(); }