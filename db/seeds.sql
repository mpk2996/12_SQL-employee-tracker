-- Departments
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Marketing');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES 
    ('Sales Manager', 70000, 1),
    ('Sales Representative', 50000, 1),
    ('Software Engineer', 80000, 2),
    ('Quality Asssurance Engineer', 67000, 2),
    ('Marketing Specialist', 60000, 3),
    ('Marketing Manager', 70000, 3);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Mike', 'Kehoe', 3, 2),
    ('Matt', 'Brown', 4, 3),
    ('Beth', 'Johnson', 5, 2),
    ('Betty', 'White', 6, 3);