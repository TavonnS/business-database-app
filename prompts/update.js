const mysql2 = require('mysql2');

const updatePrompt = [
    {
        type: 'list',
        name: 'selectEmployeeToUpdate',
        message: 'Which employee do you want to update?',
        choices: ['Jonny Carson', 'Mikey Mike', 'Ashley Rouge', 'Kevin Tripik', 'Karry Sings', 'Mal Orange', 'Sareph Lordey', 'Thom Alien']

    },
    {
        type: 'list',
        name: 'selectUpdatedEmployeeRole',
        message: 'What is the employee\'s new role?',
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
    },
];

module.exports = updatePrompt;

// these prompts need sql data