const mysql2 = require('mysql2');
const connection = require('../mysql2');

const role = connection.query('SELECT * FROM role;', (err, results) => {
    if (err) {
        console.error(err);
        return;
    }
    return results;
});

const manager = connection.query('SELECT * FROM employee;', (err, results) => {
    if (err){console.error(err);
        return;
    }
    return results;
});

const employeePrompt = [
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
        name: 'addEmployeeRole',
        message: 'What is the role of the new employee?',
        choices: []
    },
    {
        type: 'list',
        name: 'addEmployeeManager',
        message: 'Who is the new employee\'s manager?',
        choices: ['Jonny Carson', 'Mikey Mike', 'Ashley Rouge', 'Kevin Tripik', 'Karry Sings', 'Mal Orange', 'Sareph Lordey', 'Thom Alien']
    }];

module.exports = employeePrompt;      


// last two prompts need sql data

// ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
