const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection pool
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'employees_db',
});

//connect to database
connection.connect((err) => {
  if (err) throw err;
  console.log('database connection successful!');
});

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
          connection.end();
          break;
      }
    });
}

// View all departments
function viewAllDepartments() {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    promptOptions();
  });
}

// View all roles
function viewAllRoles() {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    promptOptions();
  });
}

// View all employees
function viewAllEmployees() {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
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
      connection.query('INSERT INTO department SET ?', { name: answers.name }, (err, res) => {
        if (err) throw err;
        console.log(`Added ${answers.name} to the database.`);
        promptOptions();
      });
    });
}

// Add a role
function addRole() {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    const departmentChoices = res.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    // Prompt the user for role details (title, salary, department)
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of the role:',
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department of the role:',
        choices: departmentChoices,
      },
    ])
      .then((answers) => {
        connection.query('INSERT INTO role SET?', {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.department_id
        }, (err, res) => {
          if (err) throw err;
          console.log(`Added ${answers.title} to the database.`);
          promptOptions();
        });
      });
  });
}

// Add an employee
function addEmployee() {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    const roleChoices = res.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the role of the employee:',
        choices: roleChoices,
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the manager id of the employee:'
      }
    ])
      .then((answers) => {
        connection.query('INSERT INTO employee SET?', {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id
        }, (err, res) => {
          if (err) throw err;
          console.log(`Added ${answers.first_name} ${answers.last_name} to the database.`);
          promptOptions();
        });
      });
  });
}

// Update an employee's role
function updateEmployeeRole() {
  connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id', (err, res) => {
    if (err) throw err;
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee would you like to update?',
        choices: res.map((employee) => `${employee.first_name} ${employee.last_name}, ${employee.title}`)
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the new role id of this employee?',
        choices: () => {
          return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM role', (err, res) => {
              if (err) throw err;
              resolve(res.map((role) => role.title));
            });
          });
        }
      }
    ])
      .then((answer) => {
        const employeeId = res.find((employee) => `${employee.first_name} ${employee.last_name}, ${employee.title}` === answer.employee).id;
        const roleId = res.find((employee) => employee.title === answer.role).role_id;
        connection.query('UPDATE employee SET ? WHERE ?', [
          {
            role_id: roleId
          },
          {
            id: employeeId
          }
        ], (err, res) => {
          if (err) throw err;
          console.log('Employee role updated successfully!');
          promptOptions();
        });
      });
  });
}

// Start the application
promptOptions();
