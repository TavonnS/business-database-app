const mysql2 = require('mysql2');
const connection = require('../mysql2');


// retrive departments from role table in database:
const deptList = connection.query('SELECT title FROM role;', (err, result) => 
        {
            if (err) {console.error(err)}
            return result;
        });

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
        choices: []
    }];

module.exports = rolePrompt;


// last prompt needs sql data