import React from "react";
import "./PlacementPage.css";
import { usePlacementPage } from "../hooks/usePlacementPage";
import { FaFilePdf } from "react-icons/fa"; // Import PDF icon


const PlacementPage = () => {
  const {
    username,
    offers,
    selectedOffer,
    eligibleStudents,
    appliedStudents,
    selectedStudent,
    comment,
    showModal,
    filters,
    handleLogout,
    handleOfferSelect,
    handleStudentSelect,
    handleAcceptStudent,
    handleRejectStudent,
    closeModal,
    handleCancel,
    handleFilterChange,
    filterStudents,
    setComment,
  } = usePlacementPage();


  
  const employeePhoto = localStorage.getItem("pic");
  return (
    <div>
      <nav className="navbar">
        <div className="navbar">
          {employeePhoto ? (
              <img
                src={employeePhoto}
                alt="Employee"
                className="employee-photo"
              />
            ) : (
              <span>Loading...</span>
            )}
          <span>Hello {username}!</span>
        </div>
        <div className="navbar">
          <h1>Placement Management Portal</h1>
        </div>
        <div className="navbar">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <h2>Available Organization Offers</h2>
      <div className={`offers-container ${showModal ? "blurred" : ""}`}>
        {offers.map((offer) => (
          <div key={offer.id} className="offer-box">
            <h3>{offer.name}</h3>
            <p>
              <b>
                {offer.profile}: {offer.description}
              </b>
            </p>
            <p>Required Grade: {offer.minimum_grade}</p>
            <p>Intake: {offer.intake}</p>
            <button onClick={() => handleOfferSelect(offer.id, offer.name)}>
              View Students
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <nav className="navbar">
              <div>
                <h2>
                  Student Data for{" "}
                  {selectedOffer ? selectedOffer.name : "No offer selected"}
                </h2>
              </div>
              <div>
                <button className="close-modal-btn" onClick={closeModal}>
                  Close
                </button>
              </div>
            </nav>

            <h3>Eligible Students</h3>
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
                      <option value="Advanced Algorithms">
                        Advanced Algorithms
                      </option>
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
                </tr>
              </thead>
              <tbody>
                {filterStudents(eligibleStudents).map((student) => (
                  <tr key={student.id}>
                    <td>{student.roll_number}</td>
                    <td>
                      {student.first_name} {student.last_name}
                    </td>
                    <td>{student.domain}</td>
                    <td>{student.specialisation}</td>
                    <td>{student.cgpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Applied Students</h3>
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
                      <option value="Advanced Algorithms">
                        Advanced Algorithms
                      </option>
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
                  <th>Resume</th>
                </tr>
              </thead>
              <tbody>
                {filterStudents(appliedStudents).map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => handleStudentSelect(student)}
                    className={`student-row ${
                      student === selectedStudent ? "selected" : ""
                    }`}
                  >
                    <td>{student.roll_number}</td>
                    <td>
                      {student.first_name} {student.last_name}
                    </td>
                    <td>{student.domain}</td>
                    <td>{student.specialisation}</td>
                    <td>{student.cgpa}</td>
                    <td>
                      {student.cv_application && (
                        <a href={student.cv_application} target="_blank" rel="noopener noreferrer">
                          <FaFilePdf style={{ color: "red", fontSize: "1.5em" }} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedStudent && (
              <div className="select-student">
                <div>
                  <h3>
                    Selected Student: {selectedStudent.first_name}{" "}
                    {selectedStudent.last_name}
                  </h3>
                </div>
                <div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add comments"
                    rows="2"
                    cols="50"
                  ></textarea>
                </div>
                <div className="modal-buttons">
                  <button className="accept-btn" onClick={handleAcceptStudent}>
                    Accept
                  </button>
                  <button className="reject-btn" onClick={handleRejectStudent}>
                    Reject
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementPage;
