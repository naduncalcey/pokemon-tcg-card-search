import React from "react";
import { useLocation } from "react-router-dom";

const CardDetail = () => {
  const location = useLocation();
  const card = location.state?.card; // Access the card object from location state

  return (
    <div>
      {card ? (
        <div>
          <h2>Card Details</h2>
          <img src={card.images.small} alt={card.name} />
          <p>{card.hp} HP</p>
          <p>{card.supertype}</p>
          <p>{card.rarity}</p>
        </div>
      ) : (
        <p>No card details available.</p>
      )}
    </div>
  );
};

export default CardDetail;