INSERT INTO department (name)
VALUES  ('Sales'),
        ('Legal'),
        ('Finance'),
        ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Lead', 100000.00, 1),
        ('Salesperson', 100000.00, 1),
        ('Lead Engineer', 100000.00, 4),
        ('Software Engineer', 100000.00, 4),
        ('Account Manager', 100000.00, 3),
        ('Accountant', 100000.00, 3),
        ('Legal Team Lead', 100000.00, 2),
        ('Lawyer', 100000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Johnny', 'Carson', 1, null),
        ('Mikey', 'Mike', 2, 1),
        ('Ashley', 'Rouge', 3, null),
        ('Kevin', 'Tripik', 4, 3),
        ('Karry', 'Sings', 5, null),
        ('Mal', 'Orange', 6, 5),
        ('Sareph', 'Lordey', 7, null),
        ('Thom', 'Alien', 8, 7);