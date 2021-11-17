const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// const mysql = require('mysql2');
const db = require('./db/connection.js');
const cTable = require('console.table');
const inquirer = require('inquirer');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

var roleChoices = [];
var mgrChoices = [];

function viewDepts() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  })
};

function viewRoles() {
  db.query("SELECT roles.*, department.dept_name AS dept_name FROM roles LEFT JOIN department ON roles.department_id = department.id", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  })
};


function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  })
};

const addDept = (newDept) => {
  const sql = "INSERT INTO department (dept_name) VALUES(?);"
  db.query(sql, newDept);
  init()
};

const addDeptPrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the new Department name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter a name!');
          return false;
        }
      }
    }
  ])
    .then((answer) => {
      console.log(JSON.stringify(answer["name"], null, '  '));
      addDept(answer["name"]);
    });
};



const addEmp = async () => {

  // var roleChoices = [];
  // var mgrChoices = [];

  // db.query("SELECT * FROM roles", function (err, res) {
  //   if (err) throw err;

  //       roleChoices = res.map(({ id, title }) => ({
  //       id: id,
  //       title: title
  //     }));
  //     // console.log(roleChoices);
  //   });

  // db.query("SELECT * FROM employee", function (err, res) {
  // if (err) throw err;
  //         mgrChoices = res.map(({ id, first_name, last_name }) => ({
  //     id: id,
  //     firstName: first_name,
  //     lastName: last_name
  //   }));
  //   // console.log(mgrChoices);
  // });

  inquirer.prompt([
    {
      type: 'input',
      name: 'fName',
      message: "What is the new Employee's first name? (Required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter a name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lName',
      message: "What is the new Employee's last name? (Required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter a name!');
          return false;
        }
      }
    },
    {
      type: "list",
      name: "roleID",
      message: "What is the employee's role?",
      choices: roleChoices
      // choices: [1, 2, 3, 4, 5]
    },
    {
      type: "list",
      name: "managerID",
      message: "Who is the employee's manager?",
      choices: mgrChoices
      // choices: [1, 2, 3, 4, 5]
    }
  ])

    // inquirer.prompt()
    .then(res => {
      // console.log("something");
      let employee = {
        first_name: res.fName,
        last_name: res.lName,
        role_id: JSON.parse(res.roleID).id,
        manager_id: JSON.parse(res.managerID).id
      }
      console.log(employee);

      // const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)"
      const sql = "INSERT INTO employee SET ?"
      db.query(sql, employee);
      
      // console.log("after the employee is made");
    })
    .then(
      () => {init();}
    )

};



const questions = () => {


  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View all Departments',
        'View all Roles',
        'View all Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        "Update an Employee's Role",
        'Quit'
      ]
    }
  ])
    .then((answer) => {
      console.log(JSON.stringify(answer["action"], null, '  '));
      decider(answer["action"]);
    });
};

function decider(answer) {

  switch (answer) {
    case 'View all Departments':
      viewDepts();
      break;
    case 'View all Roles':
      viewRoles();
      break;
    case 'View all Employees':
      viewEmployees();
      break;
    case 'Add a Department':
      addDeptPrompt();
      break;
    case 'Add a Role':
      break;
    case 'Add an Employee':
      addEmp();
      break;
    case "Update an Employee's Role":
      break;
    case 'Quit':
      process.exit();
  }
}

function init() {


  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title }) => {
      return JSON.stringify({
          id: id,
          title: title
        })
    });
    // console.log(roleChoices);
  });

  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;

    mgrChoices = res.map(({ id, first_name, last_name }) => {
      return JSON.stringify({
        id: id,
            firstName: first_name,
            lastName: last_name
        })
    });
    // console.log(roleChoices);
  });

  // db.query("SELECT * FROM employee", function (err, res) {
  //   if (err) throw err;
  //   mgrChoices = res.map(({ id, first_name, last_name }) => ({
  //     id: id,
  //     firstName: first_name,
  //     lastName: last_name
  //   }));
  //   console.log(mgrChoices);
  // });

  //find out what the user wants to do
  questions()
    //then decide what to do with their answer
    .then(questionData => {
      decider(questionData);
    })
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  init();
});





// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 