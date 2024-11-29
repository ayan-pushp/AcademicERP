import React from "react";
import "./PlacementPage.css";
import Navbar from "../components/Navbar";
import OfferCard from "../components/OfferCard";
import Modal from "../components/Modal";
import { usePlacementPage } from "../hooks/usePlacementPage";


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

  return (
    <div>
      <Navbar username={username} handleLogout={handleLogout} />
      <h2>Available Organization Offers</h2>
      <div className={`offers-container ${showModal ? "blurred" : ""}`}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            handleOfferSelect={handleOfferSelect}
          />
        ))}
      </div>

      {showModal && (
        <Modal
          selectedOffer={selectedOffer}
          eligibleStudents={eligibleStudents}
          appliedStudents={appliedStudents}
          selectedStudent={selectedStudent}
          comment={comment}
          filters={filters}
          handleFilterChange={handleFilterChange}
          filterStudents={filterStudents}
          handleStudentSelect={handleStudentSelect}
          handleAcceptStudent={handleAcceptStudent}
          handleRejectStudent={handleRejectStudent}
          closeModal={closeModal}
          handleCancel={handleCancel}
          setComment={setComment}
        />
      )}
    </div>
  );
};

export default PlacementPage;
