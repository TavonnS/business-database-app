// dependancies:
const inquirer = require('inquirer');
const mysql2 = require('mysql2');

// require prompts
const firstPrompt = require('./prompts/prompts');
const departmentPrompt = require('./prompts/department');
const rolePrompt = require('./prompts/role');
const employeePrompt = require('./prompts/employee');
const updatePrompt = require('./prompts/update');

// require mysql2 connection:
const connection = require('./mysql2');


// view departments: DONE.
function deptView(){
    connection.query('SELECT * FROM department;', (err, results) => {
        if (err) {
            console.error('Error retrieving departments:', err);
        } else {
            console.table(results)

            init();
        }});
        
    };

// view roles: DONE.
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

// view employees: DONE.
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



// add department: DONE.
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

// remove department: WORKING.
function rmDept() {
    connection.query('SELECT * FROM department;', (err, result) => 
    {
        if (err) {console.error(err)}

        const deptNames = result.map(({id, name}) => ({name: name, value: id}))

    
    inquirer.prompt([
        {
        type: 'list',
        name: 'select', 
        choices: deptNames,
        message: 'Select which department to remove...'
    }
    ])
    .then((answers) => {
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





// add role:  still not complete!
function addRole(){

    connection.query('SELECT name FROM department;', (err, result) => 
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
        // const params = [answers.addRoleName, answers.addRoleSalary, answers.addRoleDepartment];
        const deptArr = [answers.addRoleDepartment];
        

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

// remove role: done.
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
    inquirer
    .prompt(employeePrompt)    
    .then((answers) => {

        const sql = `INSERT INTO employee (first_name) VALUES (?);`;
        const params = [answers.addEmployeeFname, answers.addEmployeeLname, answers.addEmployeeRole, answers.addEmployeeManager];

        return connection.promise().query(sql, params);
    })

    .then((result) => {
        console.log('Success!');
        init()
    })
    .catch((err) => {
        console.error(err);
    });
    
};

// remove employee: working but only displays last name.
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

    connection.query('SELECT name FROM department;', (err, result) => 
        {
            if (err) {console.error(err)};

            const deptNames = result.map(({id, name}) => ({name: name, value: id}));

    inquirer.prompt(updatePrompt)
    .then((answers) => 
    {
        console.log(answers)


        init();
    });
}
    )};





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
                
            else 
                connection.end()
        }
        )
};


init()