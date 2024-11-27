-- Create Department Table
CREATE TABLE department (
                            department_id BIGINT NOT NULL AUTO_INCREMENT,
                            capacity INT NOT NULL,
                            name VARCHAR(255) NOT NULL,
                            PRIMARY KEY (department_id)
);
-- Create Employee Table
CREATE TABLE employee (
                          id BIGINT NOT NULL AUTO_INCREMENT,
                          email VARCHAR(255) NOT NULL,
                          first_name VARCHAR(255) NOT NULL,
                          last_name VARCHAR(255) NOT NULL,
                          password VARCHAR(255),
                          title VARCHAR(255) NOT NULL,
                          department_id BIGINT NOT NULL,
                          PRIMARY KEY (id),
                          CONSTRAINT FK_department FOREIGN KEY (department_id) REFERENCES department(department_id)
);

-- Create Domain Table
CREATE TABLE domain (
                        domain_id BIGINT NOT NULL AUTO_INCREMENT,
                        batch VARCHAR(255) NOT NULL,
                        capacity INT NOT NULL,
                        program VARCHAR(255) NOT NULL,
                        qualification VARCHAR(255) NOT NULL,
                        PRIMARY KEY (domain_id)
);

-- Create Specialisation Table
CREATE TABLE specialisation (
                                specialisation_id BIGINT NOT NULL AUTO_INCREMENT,
                                code VARCHAR(255) NOT NULL,
                                credits_required INT,
                                description VARCHAR(255),
                                name VARCHAR(255) NOT NULL,
                                year INT,
                                PRIMARY KEY (specialisation_id)
);

-- Create Organisations Table
CREATE TABLE organisations (
                               id BIGINT NOT NULL AUTO_INCREMENT,
                               address VARCHAR(255) NOT NULL,
                               name VARCHAR(255) NOT NULL,
                               PRIMARY KEY (id)
);

-- Create Placement Table
CREATE TABLE placement (
                           id BIGINT NOT NULL AUTO_INCREMENT,
                           description VARCHAR(255) NOT NULL,
                           intake INT NOT NULL,
                           minimum_grade FLOAT(53) NOT NULL,
                           profile VARCHAR(255) NOT NULL,
                           organisation_id BIGINT NOT NULL,
                           PRIMARY KEY (id),
                           CONSTRAINT FK_organisation FOREIGN KEY (organisation_id) REFERENCES organisations(id)
);

-- Create Placement Filter Table
CREATE TABLE placement_filter (
                                  id BIGINT NOT NULL AUTO_INCREMENT,
                                  domain BIGINT NOT NULL,
                                  placement_id BIGINT NOT NULL,
                                  specialisation BIGINT NOT NULL,
                                  PRIMARY KEY (id),
                                  CONSTRAINT FK_domain FOREIGN KEY (domain) REFERENCES domain(domain_id),
                                  CONSTRAINT FK_placement FOREIGN KEY (placement_id) REFERENCES placement(id),
                                  CONSTRAINT FK_specialisation FOREIGN KEY (specialisation) REFERENCES specialisation(specialisation_id)
);

-- Create Student Table
CREATE TABLE student (
                         id BIGINT NOT NULL AUTO_INCREMENT,
                         cgpa FLOAT(53),
                         email VARCHAR(255) NOT NULL,
                         first_name VARCHAR(255) NOT NULL,
                         graduation_year INT NOT NULL,
                         last_name VARCHAR(255),
                         roll_number VARCHAR(255) NOT NULL,
                         total_credits FLOAT(53),
                         domain BIGINT NOT NULL,
                         placement_id BIGINT,
                         specialisation BIGINT NOT NULL,
                         PRIMARY KEY (id),
                         CONSTRAINT FK_domain_student FOREIGN KEY (domain) REFERENCES domain(domain_id),
                         CONSTRAINT FK_placement_student FOREIGN KEY (placement_id) REFERENCES placement(id),
                         CONSTRAINT FK_specialisation_student FOREIGN KEY (specialisation) REFERENCES specialisation(specialisation_id)
);

-- Create Placement Student Table
CREATE TABLE placement_student (
                                   id BIGINT NOT NULL AUTO_INCREMENT,
                                   about VARCHAR(255) NOT NULL,
                                   acceptance BIT,
                                   comments VARCHAR(255),
                                   cv_application VARCHAR(255) NOT NULL,
                                   date DATETIME(6),
                                   placement_id BIGINT,
                                   student_id BIGINT,
                                   PRIMARY KEY (id),
                                   CONSTRAINT FK_placement_placement_student FOREIGN KEY (placement_id) REFERENCES placement(id),
                                   CONSTRAINT FK_student_placement_student FOREIGN KEY (student_id) REFERENCES student(id)
);
