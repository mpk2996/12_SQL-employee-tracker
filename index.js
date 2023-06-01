const inquirer = require('inquirer');
const consoleTable = require('console.table');
const Queries = require('./queries');

// Prompt the user with available options
function promptOptions() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      const option = answers.option;
      switch (option) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
      }
    });
}

// View all departments
function viewAllDepartments() {
  Queries.getAllDepartments()
    .then(([rows]) => {
      console.table(rows);
      promptOptions();
    })
    .catch((err) => {
      console.error('Error occurred while retrieving departments:', err);
      promptOptions();
    });
}

// View all roles
function viewAllRoles() {
  Queries.getAllRoles()
    .then(([rows]) => {
      console.table(rows);
      promptOptions();
    })
    .catch((err) => {
      console.error('Error occurred while retrieving roles:', err);
      promptOptions();
    });
}

// View all employees
function viewAllEmployees() {
  Queries.getAllEmployees()
    .then(([rows]) => {
      console.table(rows);
      promptOptions();
    })
    .catch((err) => {
      console.error('Error occurred while retrieving employees:', err);
      promptOptions();
    });
}

// Add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:',
      },
    ])
    .then((answers) => {
      const name = answers.name;
      Queries.addDepartment(name)
        .then(() => {
          console.log('Department added successfully!');
          promptOptions();
        })
        .catch((err) => {
          console.error('Error occurred while adding department:', err);
          promptOptions();
        });
    });
}

// Add a role
function addRole() {
  // Prompt the user for role details (title, salary, department)
  // Perform the database insertion using Queries.addRole()
  // Handle success and error cases
  // Prompt for next action using promptOptions()
}

// Add an employee
function addEmployee() {
  // Prompt the user for employee details (first name, last name, role, manager)
  // Perform the database insertion using Queries.addEmployee()
  // Handle success and error cases
  // Prompt for next action using promptOptions()
}

// Update an employee role
function updateEmployeeRole() {
  // Prompt the user to select an employee to update
  // Prompt for the new role
  // Perform the database update using Queries.updateEmployeeRole()
  // Handle success and error cases
  // Prompt for next action using promptOptions()
}

// Start the application
promptOptions();
