import React from "react";
import { useLocation } from "react-router-dom";

const CardDetail = () => {
  const location = useLocation();
  const card = location.state?.card; // Access the card object from location state

  return (
    <div className="flex flex-w-full flex-wrap justify-center">
      {card ? (
        <div>
        <h2 className="font-epilogue font-semibold text-[20px] my-4">Card Details</h2>
        <div className="bg-[#1111] border-neutral-950 border-3 ">
          <img src={card.images.small} alt={card.name} />
          <p className="font-epilogue text-[20px] m-2">{card.hp} HP</p>
          <p className="font-epilogue text-[20px] m-2">{card.supertype}</p>
          <p className="font-epilogue text-[20px] m-2">{card.rarity}</p>
        </div>
        </div>
      ) : (
        <p>No card details available.</p>
      )}
    </div>
  );
};

export default CardDetail;