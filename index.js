const inquirer = require('inquirer');
const fs = require('fs');

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

function viewAllDepartments() {

};

function viewAllRoles() {

};

function viewAllEmployees() {

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