-- Insert data into Department Table
INSERT INTO department (capacity, name) VALUES
                                            (50, 'HR'),
                                            (20, 'Admin'),
                                            (50, 'Outreach'),
                                            (20, 'Finance'),
                                            (90, 'Faculty');

-- Insert data into Employee Table (10 rows)
INSERT INTO employee (email, first_name, last_name, password, title, department_id) VALUES
                                                                                        ('john.doe@example.com', 'John', 'Doe', '$2a$10$twHXCYyKu526c.SF3ZsANunWX2M.k.NltaoAdCW7LsNeYxsMGhhTu', 'Manager', 1),
                                                                                        ('jane.smith@example.com', 'Jane', 'Smith', '$2a$10$twHXCYyKu526c.SF3ZsANunWX2M.k.NltaoAdCW7LsNeYxsMGhhTu', 'Developer', 2),
                                                                                        ('mark.jones@example.com', 'Mark', 'Jones', '$2a$10$twHXCYyKu526c.SF3ZsANunWX2M.k.NltaoAdCW7LsNeYxsMGhhTu', 'Manager', 3),
                                                                                        ('lucy.brown@example.com', 'Lucy', 'Brown', '$2a$10$twHXCYyKu526c.SF3ZsANunWX2M.k.NltaoAdCW7LsNeYxsMGhhTu', 'Business Analyst', 4),
                                                                                        ('kevin.taylor@example.com', 'Kevin', 'Taylor', '$2a$10$twHXCYyKu526c.SF3ZsANunWX2M.k.NltaoAdCW7LsNeYxsMGhhTu', 'Professor', 5),
                                                                                        ('susan.miller@example.com', 'Susan', 'Miller', '$2a$10$twHXCYyKu526c.SF3ZsANunWX2M.k.NltaoAdCW7LsNeYxsMGhhTu', 'Trainer', 1),
                                                                                        ('lisa.wilson@example.com', 'Lisa', 'Wilson', '$2a$10$twHXCYyKu526c.SF3ZsANunWX2M.k.NltaoAdCW7LsNeYxsMGhhTu', 'Project Manager', 2),
                                                                                        ('george.johnson@example.com', 'George', 'Johnson', '$2a$10$twHXCYyKu526c.SF3ZsANunWX2M.k.NltaoAdCW7LsNeYxsMGhhTu', 'Manager', 3),
                                                                                        ('michael.lewis@example.com', 'Michael', 'Lewis', '$2a$10$twHXCYyKu526c.SF3ZsANunWX2M.k.NltaoAdCW7LsNeYxsMGhhTu', 'Business Manager', 4),
                                                                                        ('emily.davis@example.com', 'Emily', 'Davis', '$2a$10$twHXCYyKu526c.SF3ZsANunWX2M.k.NltaoAdCW7LsNeYxsMGhhTu', 'Assistant Professor', 5);



-- Insert data into Domain Table
INSERT INTO domain (batch, capacity, program, qualification) VALUES
                                                                 ('2022', 150, 'CSE', 'Bachelor'),
                                                                 ('2023', 100, 'CSE', 'Master'),
                                                                 ('2022', 150, 'Electronics & Communication', 'Bachelor'),
                                                                 ('2023', 60, 'Electronics & Communication', 'Master'),
                                                                 ('2024', 50, 'Data Science & Artificial Intelligence', 'Master');

-- Insert data into Specialisation Table
INSERT INTO specialisation (code, credits_required, description, name, year) VALUES
                                                                                 ('DSA', 80, 'Specialisation in Advanced Algorithms', 'Advanced Algorithms', 3),
                                                                                 ('CYS', 60, 'Specialisation in CyberSecurity', 'Cyber Security', 2),
                                                                                 ('AIML', 70, 'Specialisation in Artificial Intelligence', 'AI', 2),
                                                                                 ('VLSI', 60, 'Specialisation in Very Large Scale Integration', 'VLSI', 3),
                                                                                 ('SSP', 70, 'Specialisation in Signal Systems and Processing', 'Signal Systems', 3);

-- Insert data into Organisations Table
INSERT INTO organisations (address, name) VALUES
                                              ('123 Tech St.', 'VISA'),
                                              ('456 Builders Ave.', 'NVIDIA'),
                                              ('789 Data St.', 'IBM'),
                                              ('101 Market St.', 'Morgan Stanley');

-- Insert data into Placement Table
INSERT INTO placement (description, intake, minimum_grade, profile, organisation_id) VALUES
                                                                                         ('Internship for Software Developers', 20, 3.2, 'Internship', 1),
                                                                                         ('Summer Internship for VLSI Engineers', 30, 3.2, 'Summer Internship', 2),
                                                                                         ('R&D Internship', 10, 3.5, 'Internship', 3),
                                                                                         ('Internship for Software Developers', 30, 3.0, 'Internship', 4);

-- Insert data into Placement Filter Table
INSERT INTO placement_filter (domain, placement_id, specialisation) VALUES
                                                                        (1, 1, 1),
                                                                        (2, 1, 1),
                                                                        (5, 1, 3),

                                                                        (3, 2, 4),
                                                                        (3, 2, 5),
                                                                        (4, 2, 4),
                                                                        (4, 2, 5),

                                                                        (1, 3, 3),
                                                                        (2, 3, 3),
                                                                        (5, 3, 3),

                                                                        (1, 4, 1),
                                                                        (1, 4, 2),
                                                                        (1, 4, 3),
                                                                        (2, 4, 1),
                                                                        (2, 4, 2),
                                                                        (2, 4, 3);

-- Insert data into Student Table
INSERT INTO student (cgpa, email, first_name, graduation_year, last_name, roll_number, total_credits, domain, placement_id, specialisation) VALUES
                                                                                                                                                (3.8, 'aryan.khan@email.com', 'Aryan', 2026, 'Khan', 'BT2022001', 120, 1, NULL, 1),
                                                                                                                                                (3.6, 'ayan.pushp@email.com', 'Ayan', 2025, 'Pushp', 'MT2023002', 110, 2, NULL, 2),
                                                                                                                                                (3.2, 'naman.samant@email.com', 'Naman', 2025, 'Samant', 'MT2023003', 125, 3, NULL, 4),
                                                                                                                                                (3.0, 'david.miller@email.com', 'David', 2026, 'Miller', 'BT2022002', 115, 4, NULL, 4),
                                                                                                                                                (3.1, 'eva.wilson@email.com', 'Eva', 2025, 'Wilson', 'MT2023004', 130, 5, NULL, 3),
                                                                                                                                                (2.4, 'frank.moore@email.com', 'Frank', 2026, 'Moore', 'MT2024001', 105, 5, NULL, 3),
                                                                                                                                                (2.8, 'grace.jackson@email.com', 'Grace', 2026, 'Jackson', 'BT2022003', 135, 1, NULL, 3),
                                                                                                                                                (3.6, 'hannah.martin@email.com', 'Hannah', 2026, 'Martin', 'MT2024005', 100, 2, NULL, 1),
                                                                                                                                                (3.4, 'ian.lee@email.com', 'Ian', 2026, 'Lee', 'BT2022004', 140, 3, NULL, 4),
                                                                                                                                                (2.7, 'jack.smith@email.com', 'Jack', 2025, 'Smith', 'MT2023006', 95, 4, NULL, 5),
                                                                                                                                                (3.7, 'manas.manna@email.com', 'Manas', 2025, 'Manna', 'MT2023007', 95, 5, NULL, 3),
                                                                                                                                                (2.9, 'jerry.thomas@email.com', 'Jerry', 2026, 'Thomas', 'MT2024008', 95, 2, NULL, 1);

-- Insert data into Placement Student Table
INSERT INTO placement_student (about, cv_application, placement_id, student_id) VALUES
                                                                                                                ('Interested in backend development', 'cv1.pdf',1, 1),
                                                                                                                ('Looking for a data science role','cv2.pdf',3, 2),
                                                                                                                ('Passionate about VLSI engineering', 'cv3.pdf',2, 3),
                                                                                                                ('Looking for a R&D role','cv4.pdf',3, 4),
                                                                                                                ('Interested in R&D positions','cv5.pdf',3, 5),
                                                                                                                ('Interest in full-stack development','cv6.pdf',1, 6),
                                                                                                                ('Software developer intern position','cv7.pdf',4, 7),
                                                                                                                ('Looking for a VLSI Job','cv8.pdf',2, 8),
                                                                                                                ('Interested in a Summer internship', 'cv9.pdf',1, 9),
                                                                                                                ('Interested in Cybersecurity roles', 'cv10.pdf',4, 10);
