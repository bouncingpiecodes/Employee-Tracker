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
VALUES  ("Robert", "Smith", 1, NULL),
        ("Sioxsie", "Sioux", 2, 1),
        ("Tom", "Petty", 3, 1),
        ("Laura Jane", "Grace", 4, NULL),
        ("Glen", "Danzig", 5, 4),
        ("Kathleen", "Hanna", 6, NULL),
        ("Joey", "Ramone", 7, 6),
        ("Patti", "Smith", 8, 6),
        ("Dolly", "Parton", 9, NULL),
        ("Rob", "Halford", 10, 9);