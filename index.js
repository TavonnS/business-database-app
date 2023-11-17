const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const appPrompt = require('./prompts');

function init() {
    inquirer
    .prompt(appPrompt)
    .then((answers) => {
        console.log(answers);
        const option = answers.options;
        const addDepartment = answers.addDepartment;
        const addRoleName = answers.addRoleName;
        const addRoleSalary = answers.addRoleSalary;
        const addRoleDepartment = answers.addRoleDepartment;
        const addEmployeeFname = answers.addEmployeeFname;
        const addEmployeeLname = answers.addEmployeeLname;
        const addEmployeerole = answers.addEmployeerole;
        const addEmployeeManager = answers.addEmployeeManager;
        const selectEmployeeToUpdate = answers.selectEmployeeToUpdate;
        const selectUpdatedEmployeeRole = answers.selectUpdatedEmployeeRole;

        if (answers.options === 'View all departments')
            { 
            connection.query('SELECT * FROM departments;', (err, results) => {
            if (err) {
              console.error('Error executing SELECT query:', err);
              return;
            }
            console.log('Viewing all departments:', results);
          });
            


        }
        if (answers.options === 'View all roles')
            {}
        if (answers.options === 'View all employees')
            {}
        if (answers.options === 'Add a department')
            {}
        if (answers.options === 'Add a role')
            {}
        if (answers.options === 'Add an employee')
            {}
        if (answers.options === 'Update an employee role')
            {}
        if (answers.options === 'Quit')
            {}

    }) // end .then 
    // end function
};

init();
