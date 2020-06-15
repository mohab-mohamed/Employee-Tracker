DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE departments(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

CREATE TABLE employees(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);

DROP TABLE employees;

INSERT INTO departments(name)
VALUES ("Engineering"), ("Finance"), ("Sales"), ("Legal");

SELECT * FROM departments;

INSERT INTO roles(title, salary, department_id)
VALUES ("Software Engineer", 130000, 1),
("Lead Engineer", 175000, 1),
("Accountant", 85000, 2),
("Sales Lead", "110000", 3),
("Salesperson", "65000", 3),
("Lawyer", "150000", 4),
("Legal Team Lead", "175000", 4);

SELECT * FROM roles;

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 4, 3),
("Mike", "Chan", 5, 1),
("Ashley", "Rodriguez", 2, null),
("Kevin", "Tupik", 1, 3),
("Malia", "Brown", 3, null);

SELECT * FROM employees;

SELECT roles.title, roles.salary, departments.name
FROM departments JOIN roles ON roles.department_id = departments.id;

SELECT employees.id, employees.first_name, employees.last_name, roles.title,
departments.name, roles.salary, employees.manager_id
FROM departments
INNER JOIN roles ON roles.department_id = departments.id
INNER JOIN employees ON employees.role_id = roles.id;