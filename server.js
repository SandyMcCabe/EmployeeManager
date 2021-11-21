const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const mysql = require('mysql2');
const db = require('./db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

// global variables used in the inquirer prompts
var roleChoices = [];
var empChoices = [];
var deptChoices = [];

// To view all dapartments
function viewDepts() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  })
};

// To view all roleChoices, including ID, salary, and dept
function viewRoles() {
  db.query("SELECT roles.id, roles.title, roles.salary, department.dept_name AS dept_name FROM roles LEFT JOIN department ON roles.department_id = department.id", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  })
};

// To view all employees with name, id, title, dept, salary, and manager name
function viewEmployees() {
  db.query("SELECT e.id AS id, e.first_name AS first_name, e.last_name AS last_name, r.title, d.dept_name, r.salary, m.first_name AS mgr_first, m.last_name AS mgr_last FROM employee e, employee m, roles r, department d WHERE e.manager_id = m.id and e.role_id = r.id and r.department_id = d.id", function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  })
};

//adding a new department
const addDept = (newDept) => {
  const sql = "INSERT INTO department (dept_name) VALUES(?);"
  db.query(sql, newDept);
  init()
};

//getting the information needed to add the department
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

//adding a new role
const addRole = async () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is the title of the new role? (Required)",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter a title!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: "What is the salary for the new role? (Required)",
      validate: salaryInput => {
        if (salaryInput) {
          return true;
        } else {
          console.log('Please enter a salary!');
          return false;
        }
      }
    },
    {
      type: "list",
      name: "deptID",
      message: "In what department will the new role be?",
      choices: deptChoices
    }
  ])
    .then(res => {
      let newRole = {
        title: res.name,
        salary: res.salary,
        department_id: JSON.parse(res.deptID).id
      }

      const sql = "INSERT INTO roles SET ?"
      db.query(sql, newRole);
    })
    .then(
      () => { init(); }
    )
};

//update an employee's role
const updateEmpRole = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Who is the employee?",
      choices: empChoices
    },
    {
      type: "list",
      name: "roleID",
      message: "What is their new role?",
      choices: roleChoices
    }
  ])
    .then(res => {
      let empID = JSON.parse(res.employee).id;
      let roleID = JSON.parse(res.roleID).id;
      db.query("UPDATE employee SET role_id = ? WHERE id = ?", [roleID, empID]);
    })
    .then(
      () => { init(); }
    )
};

//add a new employee
const addEmp = async () => {
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
    },
    {
      type: "list",
      name: "managerID",
      message: "Who is the employee's manager?",
      choices: empChoices
    }
  ])

    .then(res => {
      let employee = {
        first_name: res.fName,
        last_name: res.lName,
        role_id: JSON.parse(res.roleID).id,
        manager_id: JSON.parse(res.managerID).id
      }
      const sql = "INSERT INTO employee SET ?"
      db.query(sql, employee);
    })
    .then(
      () => { init(); }
    )
};

//the main list of action choices
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

//selecting the various functions based on the the choice from the action selection
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
      addRole();
      break;
    case 'Add an Employee':
      addEmp();
      break;
    case "Update an Employee's Role":
      updateEmpRole();
      break;
    case 'Quit':
      process.exit();
  }
}

//start here!
function init() {
  //set the global arrays to use in the prompts
  db.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    roleChoices = res.map(({ id, title }) => {
      return JSON.stringify({
        id: id,
        title: title
      })
    });
  });
  //set the global arrays to use in the prompts
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    empChoices = res.map(({ id, first_name, last_name }) => {
      return JSON.stringify({
        id: id,
        firstName: first_name,
        lastName: last_name
      })
    });
  });
  //set the global arrays to use in the prompts
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    deptChoices = res.map(({ id, dept_name }) => {
      return JSON.stringify({
        id: id,
        depttName: dept_name
      })
    });
  });

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

