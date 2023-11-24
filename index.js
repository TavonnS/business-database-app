const inquirer = require('inquirer');
const mysql2 = require('mysql2');
// require prompts
const firstPrompt = require('./prompts/prompts');
const departmentPrompt = require('./prompts/department');
const rolePrompt = require('./prompts/role');
const employeePrompt = require('./prompts/employee');
const updatePrompt = require('./prompts/update');
// require mysql2
const connection = require('./mysql2');

// the sql functions here:

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
    connection.query('SELECT * FROM role JOIN department ON role.department_id = department.id;', (err, results) => {
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
    connection.query('SELECT * FROM employee;', (err, results) => {
        if (err) {
            console.error('Error finding employees', err);
        } else {
            console.table(results);
            init();
        }
    })
 };

// the database action functions:

// add department:
function addDept() {
    inquirer
    .prompt(departmentPrompt)
    .then(
    (answers) => {
    const sql = `INSERT INTO department (name) VALUES (?);`
    const params = answers.addDepartment;
    connection.query(sql, params, (err, result) => {
    if (err) {return console.error(err)}
    else console.log(result) } ); // mysql function ends
    } ) // inquirer function ends
}; // add department function ends





// add role:
function addRole(){
    inquirer.prompt(rolePrompt).then((answers) => {
        const sqlName = `INSERT INTO role (name) VALUES (?);`
        const paramsN = answers.addRoleName;

        connection.query(sqlName, paramsN, (err, result) => {
            if (err){console.error(err)}
            console.log(result)
        });

        const sqlSalary = `INSERT INTO role (salary) VALUES (?);`    
        const paramsSal = answers.addRoleSalary;
            
        connection.query(sqlSalary, paramsSal, (err, result) => {
            if (err){console.error(err)}
            console.log(result)
        });

        const sqlDept = `INSERT INTO role (department_id) VALUES (?);`
        const paramsDept = answers.addRoleDepartment;

        connection.query(sqlDept, paramsDept, (err, result) => {
            if (err){console.error(err)}
            console.log(result)
        });
    
    })
};

function addEmployee() {
    inquirer.prompt(employeePrompt)    
    .then((answers) => 
    {
        const sqlFName = `INSERT INTO employee (first_name) VALUES (?);`
        const paramsFName = answers.addEmployeeFName;

        connection.query(sqlFName, paramsFName, (err, result) => 
        {
            return result;
        });

        const sqlLName = `INSERT INTO employee (last_name) VALUES (?);`
        const paramsLName = answers.addEmployeeLName;

        connection.query(sqlLName, paramsLName, (err, result) => 
        {
            return result;
        });

        const sqlEmpRole = `INSERT INTO employee (role_id) VALUES (?);`
        const paramsEmpRole = answers.addEmployeeRole;

        connection.query(sqlEmpRole, paramsEmpRole, (err, result) => 
        {
            return result;
        });

        const sqlEmpMang = `INSERT INTO employee (managers_id) VALUES (?);`
        const paramsEmpMang = answers.addEmployeeManager;

        connection.query(sqlEmpMang, paramsEmpMang, (err, result) => 
        {
            return result;
        });

        init();


    })





};
function updateEmployee() {
    inquirer.prompt(updatePrompt)
    .then((answers) => 
    {
        console.log(answers)


        init();
    });
};


// the main function:
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
                
            else if (answers.options === "Add a role") { addRole()}
               
            else if (answers.options === "Add an employee") {addEmployee()}
                
            else if (answers.options === "Update an employee role") {updateEmployee()} 
                
           else 
                connection.end()
        }
        )
    };
// end init function

init()