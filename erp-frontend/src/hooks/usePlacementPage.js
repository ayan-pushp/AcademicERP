import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/api";
import { setUpApiInterceptor } from "../utils/api";

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
    const fetchOffers = async () => {
        const response = await axios.get("/placement/allOffers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOffers(response.data); 
    };
    fetchOffers();
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
