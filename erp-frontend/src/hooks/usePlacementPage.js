import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import { setUpApiInterceptor } from "../utils/api";
import {jwtDecode} from "jwt-decode";

export const usePlacementPage = () => {
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

  useEffect(() => {
    setUpApiInterceptor(navigate);

    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { exp } = jwtDecode(token); // Decode token to get expiration time
      const timeLeft = exp * 1000 - Date.now(); // Calculate time left in milliseconds

      if (timeLeft <= 0) {
        handleLogout();
        return; // If token is already expired, log out immediately
      } else {
        // Set timeout for auto-logout
        setTimeout(handleLogout, timeLeft);

      }
    } catch (error) {
      console.error("Error decoding token:", error);
      handleLogout(); // Log out if token decoding fails
    }

    const fetchOffers = async () => {
      try {
        const response = await axios.get("/placement/allOffers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
    fetchOffers();
    
        // Clean up timeout when component unmounts or dependencies change
        return () => clearTimeout();
  }, [navigate]);

  const handleOfferSelect = async (offerId, name) => {
    resetFilters();
    try {
      const eligibleResponse = await axios.get(`/placement/eligibleFor/${offerId}`);
      setEligibleStudents(eligibleResponse.data);
    } 
    catch (error) {
      console.error("Error fetching eligible students:", error);
    }

    try {
      const appliedResponse = await axios.get(`/placement/appliedTo/${offerId}`);
      setAppliedStudents(appliedResponse.data);
    } 
    catch (error) {
      console.error("Error fetching applied students:", error);
    }
    setSelectedOffer({ offerId, name });
    setShowModal(true);
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleAcceptStudent = async () => {
    if (!selectedStudent || !comment) {
      alert("Please select a student and add a comment");
      return;
    }
    const { offerId, name } = selectedOffer;
    try {
      const response = await axios.post(`/placement/accept/${selectedStudent.id}`,
        {
          placement_id: offerId,
          student_name: `${selectedStudent.first_name} ${selectedStudent.last_name}`,
          company: name,
          comment,
          domain: selectedStudent.domain,
          specialisation: selectedStudent.specialisation
        }
      );
      const appliedResponse = await axios.get(`/placement/appliedTo/${offerId}`);
      setAppliedStudents(appliedResponse.data);
      alert(response.data);
    }
     catch (error) {
      console.error("Error updating acceptance:", error);
    }
    resetFilters();
    setComment("");
    setSelectedStudent(null);
  };

  const handleRejectStudent = async () => {
    if (!selectedStudent || !comment) {
      alert("Please select a student and add a comment");
      return;
    }
    const { offerId, name } = selectedOffer;
    try {
      const response = await axios.post(`/placement/reject/${selectedStudent.id}`,
        {
          placement_id: offerId,
          student_name: `${selectedStudent.first_name} ${selectedStudent.last_name}`,
          comment,
          company: name,
          domain: selectedStudent.domain,
          specialisation: selectedStudent.specialisation
        }
      );
      const appliedResponse = await axios.get(`/placement/appliedTo/${offerId}`);
      setAppliedStudents(appliedResponse.data);
      alert(response.data);
    } 
    catch (error) {
      console.error("Error rejecting student:", error);
    }
    resetFilters();
    setComment("");
    setSelectedStudent(null);
  };

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

  const resetFilters = () => {
    setFilters({
      grade: "",
      domain: "",
      specialisation: "",
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filterStudents = (students) =>
    students.filter((student) => {
      const meetsGrade = filters.grade
        ? student.cgpa >= parseFloat(filters.grade)
        : true;
      const meetsDomain = filters.domain
        ? student.domain === filters.domain
        : true;
      const meetsSpecialization = filters.specialisation
        ? student.specialisation === filters.specialisation
        : true;

      return meetsGrade && meetsDomain && meetsSpecialization;
    });

    const handleLogout = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      localStorage.removeItem("pic");
      // Redirect to login page
      alert("You have been logged out! Please login again.");
      navigate("/login");
    };
    

  return {
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
    resetFilters,
    handleFilterChange,
    filterStudents,
    setComment,
  };
};
