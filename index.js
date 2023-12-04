// dependancies:
const inquirer = require('inquirer');
const mysql2 = require('mysql2');

// require prompts
const firstPrompt = require('./prompts/prompts');


// require mysql2 connection:
const connection = require('./mysql2');


// view departments: 
function deptView(){
    connection.query('SELECT * FROM department;', (err, results) => {
        if (err) {
            console.error('Error retrieving departments:', err);
        } else {
            console.table(results)

            init();
        }});
        
    };

// view roles:  
function roleView(){
    connection.query(`SELECT 
    role.id,
    role.title,
    role.salary,
    department.name AS department_name
FROM 
    role
    LEFT JOIN department ON role.department_id = department.id;`,
 
    (err, results) => {
        if (err) {
            console.error('Error finding roles', err);
        } else {
            console.table(results);
            init();
        }
    })
    
};

// view employees:  
function employeeView(){
    connection.query(`SELECT
    e.id AS employee_id,
    e.first_name,
    e.last_name,
    r.title AS role_title,
    department.name AS department_name,
    r.salary,
    m.last_name AS manager_last_name
FROM 
    employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN employee m ON e.manager_id = m.id
    LEFT JOIN department ON r.department_id = department.id;`,

    (err, results) => {
        if (err) {
            console.error('Error finding employees', err);
        } else {
            console.table(results);
            init();
        }
    })
};



// add department:  
function addDept() {
    inquirer.prompt([{
            type: 'input',
            name: 'addDepartment',
            message: 'Enter the name of the new department...',
        }])
        .then((answers) => {
            const sql = `INSERT INTO department (name) VALUES (?);`;
            return connection.promise().query(sql, [answers.addDepartment]);
        })
        .then((result) => {
            console.log('Success!');
            init();
        })
        .catch((err) => {
            console.error(err);
        });
};

// remove department:  
function rmDept() {
    connection.query('SELECT * FROM department;', (err, result) => 
    {
        if (err) {console.error(err)}

        const deptIds = result.map(({id, name}) => ({name: name, value: id}))
        
    
    inquirer.prompt([
        {
        type: 'list',
        name: 'select', 
        choices: deptIds,
        message: 'Select which department to remove...'
    }
    ])
    .then((answers) => {
        console.log(answers.select);
        const sql = `DELETE FROM department WHERE id = (?);`
        return connection.promise().query(sql, [answers.select]);
        })

        .then((result) => {
            console.log('Success!');
            init();
        })
        .catch((err) => {
            console.error(err);
        })
    })};





// add role:   
function addRole(){

    connection.query('SELECT * FROM department;', (err, result) => 
        {
            if (err) {console.error(err)}

            const deptNames = result.map(({id, name}) => ({name: name, value: id}));

    inquirer.prompt([
        {
            type: 'input',
            name: 'addRoleName',
            message: 'Enter the name of the new role...'
        },
        {
            type: 'input',
            name: 'addRoleSalary',
            message: 'Enter the salary of the new role...'
        },
        {
            type: 'list',
            name: 'addRoleDepartment',
            message: 'Choose the department for the new role...',
            choices: deptNames
        }])

        .then((answers) => {

        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`
        return connection.promise().query(sql, [answers.addRoleName, answers.addRoleSalary, answers.addRoleDepartment]);
        })

        .then((result) => {
            console.log('Success!');
            init();
        })
        .catch((err) => {
            console.error(err);
        });
        
    }) 
};

// remove role:  
function rmRole() {
    
    connection.query('SELECT * FROM role;', (err, result) => 
        {
            if (err) {console.error(err)}

            const roleNames = result.map(({id, title}) => ({name: title, value: id}));
        
        
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'select',
                message: 'Select which role to remove...',
                choices: roleNames
            }
        ]
    )
    .then((answers) => {
        const sql = `DELETE FROM role WHERE id = (?);`
        return connection.promise().query(sql, [answers.select]);
        })

        .then((result) => {
            console.log('Success!');
            init();
        })
        .catch((err) => {
            console.error(err);
        });
        })
    };



    
    
// add employee:  
function addEmployee() {
    connection.query('SELECT id, title FROM role', (err, roleResult) => {
      if (err) {
        console.error(err);
        return;
      }
  
      const roles = roleResult.map(row => ({ id: row.id, title: row.title }));
  
      connection.query('SELECT id, last_name FROM employee', (err, employeeResult) => {
        if (err) {
          console.error(err);
          return;
        }
  
        const managers = employeeResult.map(row => ({ id: row.id, last_name: row.last_name }));
  
        // console.log(roles, managers);
  
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'fName',
              message: "What is the new employee's first name?",
            },
            {
              type: 'input',
              name: 'lName',
              message: "What is the new employee's last name?",
            },
            {
              type: 'list',
              name: 'role',
              message: 'What is the role of the new employee?',
              choices: roles.map(role => role.title),
            },
            {
              type: 'list',
              name: 'manager',
              message: "Who is the new employee's manager?",
              choices: managers.map(manager => manager.last_name),
            },
          ])
          .then((answers) => {
            const selectedRole = roles.find(role => role.title === answers.role);
            const selectedManager = managers.find(manager => manager.last_name === answers.manager);
            const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);';
            const params = [answers.fName, answers.lName, selectedRole.id, selectedManager.id];
  
            return connection.promise().query(sql, params);
          })

          .then((result) => {
            console.log('Success!');
            init();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    });
  };


// remove employee: 
function rmEmployee() {
    connection.query('SELECT * FROM employee;', (err, result) => {
        if (err) {console.error(err)}

        const employees = result.map(({id, last_name}) => ({name: last_name, value: id}))    
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'select',
                choices: employees,
                message: 'Select which employee to remove...'
            }
        ])
        .then((answers) => {

            const sql = `DELETE FROM employee WHERE id = (?);`
            return connection.promise().query(sql, [answers.select])
            
            .then((result) => {
                console.log('Success!');
                init();
            })
            .catch((err) => {
                console.error(err);
            });
        });
    });
    };


// update employee:  
function updateEmployee() {
    connection.query('SELECT id, last_name FROM employee', (err, employees) => {
      if (err) {
        console.error(err);
        // Handle the error
      } else {
        connection.query('SELECT id, title FROM role', (err, roles) => {
          if (err) {
            console.error(err);
            // Handle the error
          } else {
            const employeeChoices = employees.map(({ id, last_name }) => ({ name: last_name, value: id }));
            const roleChoices = roles.map(({ id, title }) => ({ name: title, value: id }));
  
            inquirer.prompt([
              {
                type: 'list',
                name: 'employee',
                message: 'Which employee do you want to update? Select by last name...',
                choices: employeeChoices,
              },
              {
                type: 'list',
                name: 'role',
                message: 'What is the employee\'s new role?',
                choices: roleChoices,
              },
            ])
              .then((answers) => {
                const employeeId = answers.employee;
                const newRoleId = answers.role;
  
                const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
                const values = [newRoleId, employeeId];
  
                connection.promise().query(sql, values)
                  .then(() => {
                    console.log('Employee role updated successfully');
                    init();
                })
                  .catch((err) => {
                    console.error(err);
                    // Handle the error
                  })
                  
              });
          }
        });
      }
    });
  };

 // update manager: 
function mUpdate() {
    connection.query('SELECT last_name FROM employee;', (err, employeeResults) => {
      if (err) {
        console.error(err);
      } else {
        connection.query('SELECT * FROM employee;', (err, managerResults) => {
          if (err) {
            console.error(err);
            // Handle the error
          } else {
            const employees = employeeResults.map(({ last_name }) => ({ name: last_name }));
            const managers = managerResults.map(({ manager_id }) => ({ name: manager_id }));
  
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'employee',
                  choices: employees,
                  message: 'Which employee is being reassigned a new manager?'
                },
                {
                  type: 'list',
                  name: 'manager',
                  choices: managers,
                  message: 'Who is the new manager?'
                }
              ])
              .then((answers) => {
                const employee = answers.employee;
                const manager = answers.manager;
                const sql = 'UPDATE employee SET manager_id = ? WHERE last_name = ?';
                const values = [manager, employee];
  
                connection.promise()
                  .query(sql, values)
                  .then(() => {
                    console.log('Employee manager updated successfully');
                    init();
                  })
                  .catch((err) => {
                    console.error(err);
                    // Handle the error
                  });
              });
          }
        });
      }
    });
  };
  
// budget by department:
function budgetView() {
    connection.query('SELECT * FROM department;', (err, results) => {
      if (err) {
        console.error(err);
      }
      const departments = results.map(({ id, name }) => ({ name: name, value: id }));
  
      inquirer
        .prompt([
          {
            name: 'department',
            message: 'Which department would you like to view for total budget?',
            choices: departments,
            type: 'list',
          },
        ])
        .then((answers) => {
          const sql = `
            SELECT department.name AS department_name, SUM(role.salary) AS total_budget
            FROM role
            INNER JOIN department ON role.department_id = department.id
            WHERE department.id = (?)
            GROUP BY department.name;
          `;
          return connection
            .promise()
            .query(sql, [answers.department])
            .then((result) => {
              const refined = result[0];
              console.table(refined);
              init();
            })
            .catch((err) => {
              console.error(err);
            });
        });
    });
  };



// the MAIN function:
function init() {
    inquirer
        .prompt(firstPrompt).then((answers) => {
            if (answers.options === "View all departments") {deptView()}
                
            else if
                (answers.options === "View all roles") {roleView()}
                
                
             else if
                (answers.options === "View all employees") {employeeView()} 
                
            
            else if 
            (answers.options === "Add a department") {addDept()} 
                
            else if (answers.options === "Add a role") {addRole()}
               
            else if (answers.options === "Add an employee") {addEmployee()}
                
            else if (answers.options === "Update an employee role") {updateEmployee()} 

            else if (answers.options === "Remove a role") {rmRole()}

            else if (answers.options === "Remove a department") {rmDept()}

            else if (answers.options === "Remove an employee") {rmEmployee()}

            else if (answers.options === "Update a employee\'s manager") {mUpdate()}

            else if (answers.options === "View budget by department") {budgetView()}
                
            else 
                connection.end()
        }
        )
};


init();