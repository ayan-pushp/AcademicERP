import React from "react";

const OfferCard = ({ offer, handleOfferSelect }) => {
  return (
    <div className="offer-box">
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
  );
};

export default OfferCard;
