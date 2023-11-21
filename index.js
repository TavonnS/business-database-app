const inquirer = require('inquirer');
const mysql2 = require('mysql2');
// require prompts
const firstPrompt = require('./prompts');
const departmentPrompt = require('./prompts');
const rolePrompt = require('./prompts');
const employeePrompt = require('./prompts');
const updatePrompt = require('./prompts');
// require mysql2
const connection = require('./mysql2');

function init() {
    inquirer
        .prompt(firstPrompt).then((answers) => {
            if (answers.options === "View all departments") {
                connection.query('SELECT * FROM department;', (err, results) => {
                    if (err) {
                        console.error('Error retrieving departments:', err);
                    } else {
                        console.log('Viewing all departments:', results)
                    }
                })
                connection.end();
            } else if
                (answers.options === "View all roles") {
                connection.query('SELECT * FROM role;', (err, results) => {
                    if (err) {
                        console.error('Error finding roles', err);
                    } else {
                        console.log('Viewing all roles:', results);
                    }
                })
                connection.end();
            } else if
                (answers.options === "View all employees") {
                connection.query('SELECT * FROM employee;', (err, results) => {
                    if (err) {
                        console.error('Error finding employees', err);
                    } else {
                        console.log('Viewing all employees:', results);
                    }
                })
                connection.end();
            } 
            // action prompts:
            
            else if (answers.options === "Add a department") {
                    addDept();
            } else if (answers.options === "Add a role") {
                inquirer.prompt(
                rolePrompt).then();
            } else if (answers.options === "Add an employee") {
                inquirer.prompt(
                employeePrompt)
            } else if (answers.options === "Update an employee role") {
                inquirer.prompt(updatePrompt);
            } else 
                connection.end();
        });
    }
// end init function

function addDept(){
    inquirer.prompt(departmentPrompt).then((answers) => {
        console.log(answers);
    });
};


init();