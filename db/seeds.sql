INSERT INTO department (name)
VALUES  ("Marketing"),
        ("Quality Control"),
        ("Development"),
        ("Accounting");

INSERT INTO role (title, salary, department_id) 
VALUES  ("Marketing Manager", 120000, 1),
        ("Senior Marketer", 100000, 1),
        ("Copy Editor", 60000, 1),
        ("Quality Control Manager", 100000, 2),
        ("QA Specialist", 70000, 2),
        ("Development Manager", 120000, 3),
        ("Senior Developer", 100000, 3),
        ("Junior Developer", 80000, 3),
        ("Accounting Manager", 120000, 4),
        ("Accountant", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Robert", "Specktor", 1, NULL),
        ("Skip", "Branchild", 2, 1),
        ("Lucy", "Jenkins", 3, 1),
        ("Elizabeth", "Brokaw", 4, NULL),
        ("Stanley", "Allen", 5, 4),
        ("Patrick", "Whitaker", 6, NULL),
        ("Marcy", "Caufield", 7, 6),
        ("Joe", "Hanker", 8, 6),
        ("Jessica", "Nysmith", 9, NULL),
        ("Brenda", "Wilson", 10, 9);