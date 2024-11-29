import React from "react";
import { FaFilePdf } from "react-icons/fa"; // Import PDF icon

const StudentTable = ({
  title,
  students,
  selectedStudent,
  filters,
  handleFilterChange,
  filterStudents,
  handleStudentSelect,
  appliedStudents,
}) => {
  const isStudentApplied = (student) => {
    // Check if the student is in the appliedStudents list
    return student && student.id && appliedStudents.some((applied) => applied.id === student.id);
  };
  return (
    <div>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>
              Domain
              <select
                name="domain"
                onChange={handleFilterChange}
                value={filters.domain}
              >
                <option value="">All</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="DSAI">DSAI</option>
              </select>
            </th>
            <th>
              Specialisation
              <select
                name="specialisation"
                onChange={handleFilterChange}
                value={filters.specialisation}
              >
                <option value="">All</option>
                <option value="Advanced Algorithms">Advanced Algorithms</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="AI">AI</option>
                <option value="VLSI">VLSI</option>
                <option value="Signal Systems">Signal Systems</option>
              </select>
            </th>
            <th>
              CGPA
              <select
                name="grade"
                onChange={handleFilterChange}
                value={filters.grade}
              >
                <option value="">All</option>
                <option value="3.0">3.0 and above</option>
                <option value="3.5">3.5 and above</option>
                <option value="4.0">4.0</option>
              </select>
            </th>
            {students.length > 0 && isStudentApplied(students[0]) && <th>Resume</th>} {/* Only show Resume if any student in the list is applied */}
          </tr>
        </thead>
        <tbody>
          {filterStudents(students).map((student) => {
            const isApplied = isStudentApplied(student);
            return (
              <tr
                key={student.id}
                onClick={() => isApplied && handleStudentSelect(student)} // Only allow selection if student is applied
                className={`student-row ${student === selectedStudent ? "selected" : ""}`}
              >
                <td>{student.roll_number}</td>
                <td>{student.first_name} {student.last_name}</td>
                <td>{student.domain}</td>
                <td>{student.specialisation}</td>
                <td>{student.cgpa}</td>
                {isApplied && student.cv_application && ( // Only show resume for applied students
                  <td>
                    <a href={student.cv_application} target="_blank" rel="noopener noreferrer">
                      <FaFilePdf style={{ color: "red", fontSize: "1.5em" }} />
                    </a>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
