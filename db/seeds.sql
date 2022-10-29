INSERT INTO departments (department_name)
VALUES 
("Sales"),
("Management"),
("Accounting"),
("Marketing");

INSERT INTO roles (job_title, salary, department_id)
VALUES 
("Salesperson", 80000, 1),
("Manager", 140000, 2),
("Accountant", 75000, 3),
("Marketing", 65000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Bob", "Smith", 1, 1),
("Jane", "Doe", 2, 1),
("Tater", "Potater", 3),
("Frank", "Beans", 4, 1);
