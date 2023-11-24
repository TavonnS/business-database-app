const mysql2 = require('mysql2');

const rolePrompt = [
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
        choices: ['Sales', 'Legal', 'Finance', 'Engineering']
    }];

module.exports = rolePrompt;


// last prompt needs sql data