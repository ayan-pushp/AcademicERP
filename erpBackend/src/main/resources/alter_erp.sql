-- Alter Employee Table: Add Unique Constraint on email
ALTER TABLE employee
    ADD CONSTRAINT UK_email UNIQUE (email);

-- Alter Specialisation Table: Add Unique Constraint on code
ALTER TABLE specialisation
    ADD CONSTRAINT UK_code UNIQUE (code);

-- Alter Student Table: Add Unique Constraint on email
ALTER TABLE student
    ADD CONSTRAINT UK_email_student UNIQUE (email);

-- Alter Student Table: Add Unique Constraint on roll_number
ALTER TABLE student
    ADD CONSTRAINT UK_roll_number UNIQUE (roll_number);
