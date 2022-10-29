INSERT INTO departments (department_name)
VALUES 
("Sales"),
("Management"),
("Accounting"),
("Marketing");

INSERT INTO roles (job_title, salary)
VALUES 
("Salesperson", 80000),
("Manager", 140000),
("Accountant", 75000),
("Marketing", 65000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Bob", "Smith", 1, 1),
("Jane", "Doe", 2, 1),
("Tater", "Potater", 3),
("Frank", "Beans", 4, 1);
