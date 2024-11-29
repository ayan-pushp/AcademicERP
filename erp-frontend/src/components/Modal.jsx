import React from "react";
import StudentTable from "./StudentTable";

const Modal = ({
  selectedOffer,
  eligibleStudents,
  appliedStudents,
  selectedStudent,
  comment,
  filters,
  handleFilterChange,
  filterStudents,
  handleStudentSelect,
  handleAcceptStudent,
  handleRejectStudent,
  closeModal,
  handleCancel,
  setComment,
}) => {
  return (
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

        <StudentTable
          title="Eligible Students"
          students={eligibleStudents}
          filters={filters}
          handleFilterChange={handleFilterChange}
          filterStudents={filterStudents}
          handleStudentSelect={handleStudentSelect}
          appliedStudents={appliedStudents}
        />

        <StudentTable
          title="Applied Students"
          students={appliedStudents}
          filters={filters}
          handleFilterChange={handleFilterChange}
          filterStudents={filterStudents}
          handleStudentSelect={handleStudentSelect}
          appliedStudents={appliedStudents}
        />

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
  );
};

export default Modal;
