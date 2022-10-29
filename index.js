const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

// Connect to company database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the books_db database.`)
);

// Prompt that starts application when node index.js is called
function start(); {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'],
            name: 'mainMenu',
        },
    ]).then((response) => {
        if (response.mainMenu === 'View All Departments') {
            viewAllDepartments();
        } else if (response.mainMenu === 'View All Roles') {
            viewAllRoles();
        } else if (response.mainMenu === 'View All Employees') {
            viewAllEmployees();
        } else if (response.mainMenu === 'Add a Department') {
            addDepartment();
        } else if (response.mainMenu === 'Add a Role') {
            addRole();
        } else if (response.mainMenu === 'Add an Employee') {
            addEmployee();
        } else if (response.mainMenu === 'Update an Employee Role') {
            updateEmployeeRole();
        } else {
            console.log('uh oh');
        }       
    })
};

// Shows a table with department names and ids
function viewAllDepartments() {
    db.query('SELECT departments.department_name AS name, departments.id AS id FROM departments', function (err, results) {
        if (err) {
            throw err
        }
        console.table(results);        
    });
    start();
};

function viewAllRoles() {
    db.query('SELECT roles.job_title AS name, roles.id AS id, roles.department_id AS department, roles.salary AS salary FROM roles', function (err, results) {
        if (err) {
            throw err
        }
        console.table(results);        
    });
    start();
};

function viewAllEmployees() {
    db.query('SELECT employees.id AS id, employees.first_name AS name, employees.last_name AS surname, employees.role_id AS title(s), employee.manager_id AS manager(s) FROM departments', function (err, results) {
        if (err) {
            throw err
        }
        console.table(results);        
    });
    start();
};

function addDepartment() {

};

function addRole() {

};

function addEmployee() {

};

function updateEmployeeRole() {

};

start();