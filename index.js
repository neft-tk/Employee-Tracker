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
    console.log(`Connected to the company_db database.`)
);

// Prompt that starts application when node index.js is called
function start() {
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
            throw err;
        };
        console.table(results);        
    });
    start();
};

// Shows a table with role/job names, ids, and the salary
function viewAllRoles() {
    db.query('SELECT roles.job_title AS name, roles.id AS id, roles.department_id AS department, roles.salary AS salary FROM roles', function (err, results) {
        if (err) {
            throw err;
        };
        console.table(results);        
    });
    start();
};

// Shows a table with employee ids, first names, last names, their roles/jobs and their manager(s)
function viewAllEmployees() {
    db.query('SELECT employees.id AS id, employees.first_name AS name, employees.last_name AS surname, employees.role_id AS title(s), employee.manager_id AS manager(s) FROM departments', function (err, results) {
        if (err) {
            throw err;
        };
        console.table(results);        
    });
    start();
};

// Takes in the name of the new department and adds it to the database, console logs the name and goes to the main menu.
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'departmentName',
        },
    ]).then((response) => {
        db.query(`INSERT INTO departments (department_name) VALUES(${response.departmentName});`, function (err, result) {
            if (err) {
                throw err;
            };
        });

        console.log(`Added ${response.departmentName} to the database.`);

        start();        
    })

};

// Gets the data from the db 
// makes a new array that is just the role names
// returns the new array 
function currentRoles() {
    db.query('SELECT job_title FROM roles', function (err,result) {
        if (err) {
            throw err;
        } else {
            const roleList = result.map((object) => {
                return object.job_title;
            });
            console.log(roleList);
            return roleList;
        }
    });
};

// Asks the name, salary, and department for the new role, logs it into the database, and then console logs the name after. Returns to the main menu.
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the name of the role?",
            name: 'roleName',
        },
        {
            type: 'input',
            message: "What is the salary for this role?",
            name: 'roleSalary',
        },
        {
            type: 'list',
            message: "What department does this role fall under?",
            choices: currentDepartments(),
            name: 'roleDepartment',
        },
    ]).then((response) => {
        db.query(`INSERT INTO roles (job_title, salary, department_id) VALUES(${response.roleName},${response.roleSalary},${response.roleDepartment});`, function (err, result) {
            if (err) {
                throw err;
            };
        });

        console.log(`Added ${response.roleName} to the database.`);

        start();        
    })
};

// Asks prompts to get the four pieces of data that go into the employee table and console logs their name after.
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'empFirstName',
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'empLastName',
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            choices: currentRoles(),
            name: 'empRole',
        },
        {
            type: 'input',
            message: "Who is the employee's manager?",
            name: 'empManager',
        },
    ]).then((response) => {
    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(${response.empFirstName},${response.empLastName},${response.empRole},${response.empManager});`, function (err, result) {
        if (err) {
            throw err;
        };
    });

    console.log(`Added ${response.empFirstName} ${response.empLastName} to the database.`); 

    start();
    }); 
};

// Gets the data from the db 
// makes a new array that is just the employee names
// returns the new array 
function currentEmployees() {
    db.query('SELECT employees.first_name, employees.last_name FROM employees', function (err,result) {
        if (err) {
            throw err;
        } else {
            const employeeList = result.map();
            return employeeList;
        }
    });
};

// Prompts which employee and what their new role will be, overwrites the employee's old role, console logs it and returns to the main menu.
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's data do you want to update?",
            choices: currentEmployees(),
            name: 'updateEmployee',
        },
        {
            type: 'list',
            message: 'What is their new role?',
            choices: currentRoles(),
            name: 'newEmployeeRole',
        },
    ]).then((response) => {
        db.query(`INSERT INTO employees (role_id) WHERE id = ${response.updateEmployee} VALUES(${response.newEmployeeRole});`, function (err, result) {
            if (err) {
                throw err;
            };
        });

        console.log(`Updated ${response.updateEmployee}'s role to ${response.newEmployeeRole}.`);

        start();        
    });
};

// start();
currentRoles();