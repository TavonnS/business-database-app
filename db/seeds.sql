INSERT INTO department (id, name)
VALUES  (1, Sales),
        (2, Legal),
        (3, Finance),
        (4, Engineering);

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, 'Sales Lead', 100000, 'Sales'),
        (2, 'Salesperson', 80000, 'Sales'),
        (3, 'Lead Engineer', 10000, 'Engineering'),
        (4, 'Software Engineer', 10000, 'Engineering'),
        (5, 'Account Manager', 1, 'Finance'),
        (6, 'Accountant', 1, 'Finance'),
        (7, 'Legal Team Lead', 1, 'Legal'),
        (8, 'Lawyer', 1, 'Legal');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Johnny', 'Carson', 1, null),
        (2, 'Mikey', 'Mike', 2, 1),
        (3, 'Ashley', 'Rouge', 3, null),
        (4, 'Kevin', 'Thripik', 4, 3),
        (5, 'Karry', 'Sings', 5, null),
        (6, 'Mal', 'Orange', 6, 5),
        (7, 'Sareph', 'Lordey', 7, null),
        (8, 'Thom', 'Alien', 8, 7),;