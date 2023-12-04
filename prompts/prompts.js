const firstPrompt = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Remove a role', 'Remove a department', 'Remove an employee', 'Update a employee\'s manager', 'View budget by department', 'Quit'],
    }];
 
module.exports = firstPrompt;
 