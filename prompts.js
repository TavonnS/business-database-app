const inquirer = require('inquirer');

const appPrompt = [
    {
        type: 'list',
        name: 'options',
        message: 'Select an option...',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit'],
    },
    {
        type: 'input',
        name: 'addDepartment',
        message: 'Enter the name of the new department...',
    },
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
        choices: ['department list']
    },
    {
        type: 'input',
        name: 'addEmployeeFname',
        message: 'What is the new employee\'s first name?'
    },
    {
        type: 'input',
        name: 'addEmployeeLname',
        message: 'What is the new employee\'s last name?'
    },
    {
        type: 'list',
        name: 'addEmployeerole',
        message: 'What is the role of the new employee?',
        choices: ['role list']
    },
    {
        type: 'input',
        name: 'addEmployeeManager',
        message: 'Who is the new employee\'s manager?'
    },
    {
        type: 'list',
        name: 'selectEmployeeToUpdate',
        message: 'Which employee do you want to update?',
        choices: ['employee list'],

    },
    {
        type: 'list',
        name: 'selectUpdatedEmployeeRole',
        message: 'What is the employee\'s new role?',
        choices: ['role list'],
    },
];

module.exports = appPrompt;
