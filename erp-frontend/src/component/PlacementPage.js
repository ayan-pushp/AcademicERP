import React, { useState, useEffect } from "react";
import axios from "../util/api";
import "./PlacementPage.css"; 
import { useNavigate } from "react-router-dom"; 

const PlacementPage = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [eligibleStudents, setEligibleStudents] = useState([]);
  const [appliedStudents, setAppliedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    grade: "",
    domain: "",
    specialisation: "",
  });
  const navigate = useNavigate();
  const username = localStorage.getItem("username"); 

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("username"); 
    navigate("/login");
  };

  // Fetch Offers
  useEffect(() => {
    const fetchOffers = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
              console.log("No token found, redirect to login");
              navigate("/login"); 
              return; 
            }
            console.log(token);
            
            // Make the GET request with the Authorization header
            const response = await axios.get("/placement/allOffers", {
              headers: {
                Authorization: `Bearer ${token}`, 
              }
            });
            setOffers(response.data); 
          } catch (error) {
            
            if (error.response.status === 401) {
                alert("Session expired, please log in again.");
                localStorage.removeItem("authToken"); 
                navigate("/login"); 
              } else {
                console.error("Error fetching offers:", error);
              }
          }
    };
    fetchOffers();
  }, []);

  // Select Offer
  const handleOfferSelect = async (offerId, name) => {
    resetFilters();
    try {
        const eligibleResponse = await axios.get(`http://localhost:8080/api/placement/eligibleFor/${offerId}`);
        setEligibleStudents(eligibleResponse.data);
    } catch (error) {
        console.error("Error fetching eligible students:", error);
    }

    try {
        const appliedResponse = await axios.get(`http://localhost:8080/api/placement/appliedTo/${offerId}`);
        setAppliedStudents(appliedResponse.data);
    } catch (error) {
        console.error("Error fetching applied students:", error);
    }

    setSelectedOffer({ offerId, name }); 
    setShowModal(true);
};
    // Select Student
  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  // Accept Student
  const handleAcceptStudent = async () => {
    if (!selectedStudent || !comment) {
        alert("Please select a student and add a comment");
        return;
    }

    // Ensure selectedOffer has both offerId and name
    const { offerId, name } = selectedOffer;

    try {
        const response = await axios.post(`http://localhost:8080/api/placement/accept/${selectedStudent.id}`, {
            placement_id: offerId, // Use offerId from selectedOffer
            student_name: selectedStudent.first_name + " " + selectedStudent.last_name, // Use the student's full name
            company: name, // Use the name of the selected offer (company name)
            comment: comment // Use the comment
        });

        const appliedResponse = await axios.get(`http://localhost:8080/api/placement/appliedTo/${offerId}`);
        setAppliedStudents(appliedResponse.data);

        alert(response.data);
        setSelectedStudent(null);  
        setComment(""); 
    } catch (error) {
        console.error("Error updating acceptance:", error);
    }
    resetFilters();
    setComment("");
    setSelectedStudent(null);

};
  
  // Reject Student
  const handleRejectStudent = async () => {
    if (!selectedStudent || !comment) {
      alert("Please select a student and add a comment");
      return;
    }

    const { offerId, name } = selectedOffer;
    try {
      const response = await axios.post(`http://localhost:8080/api/placement/reject/${selectedStudent.id}`, {
        placement_id: offerId,
        student_name: selectedStudent.first_name + " " + selectedStudent.last_name,
        comment: comment,
        company: name
      });

      const appliedResponse = await axios.get(`http://localhost:8080/api/placement/appliedTo/${offerId}`);
      setAppliedStudents(appliedResponse.data);

      alert(response.data);
      setSelectedStudent(null);
      setComment(""); 
    } catch (error) {
      console.error("Error rejecting student:", error);
    }
  };

    // Close Modal
  const closeModal = () => {
    setShowModal(false);
    resetFilters();
    setComment("");
    setSelectedStudent(null);

  };

  const handleCancel = () => {
    resetFilters();
    setComment("");
    setSelectedStudent(null);

  };

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      grade: "",
      domain: "",
      specialisation: "",
    });
  };

  // Set Filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Filter Students
  const filterStudents = (students) => {
    return students.filter((student) => {

      const meetsGrade = filters.grade ? student.cgpa >= parseFloat(filters.grade) : true;
      const meetsDomain = filters.domain ? student.domain === filters.domain : true;
      const meetsSpecialization = filters.specialisation ? student.specialisation === filters.specialisation : true;
  
      return meetsGrade && meetsDomain && meetsSpecialization;
    });
  };
  

  return (
    <div>
      <nav className="navbar">
        <div className="navbar">
          <span>Welcome {username}</span>
        </div>
        <div className="navbar"><h1>Placement Management Portal</h1>
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
                   <td>{student.first_name} {student.last_name}</td>
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
                      style={{ marginLeft: "10px" }}
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
                      style={{ marginLeft: "10px" }}
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
                      style={{ marginLeft: "10px" }}
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
                {filterStudents(appliedStudents).map((student) => (
                  <tr 
                    key={student.id} 
                    onClick={() => handleStudentSelect(student)}
                    className={`student-row ${student === selectedStudent ? 'selected' : ''}`} 
                  >
                    <td>{student.roll_number}</td>
                    <td>{student.first_name} {student.last_name}</td>
                    <td>{student.domain}</td>
                    <td>{student.specialisation}</td>
                    <td>{student.cgpa}</td>
                  </tr>
                ))}
              </tbody>

            </table>

            {selectedStudent && (
              <div className="select-student">
                <div><h3>
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
