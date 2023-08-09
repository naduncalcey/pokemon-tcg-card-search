import React, { useEffect } from "react";

const FavoriteList = ({ favorites, removeFromFavorites, updateFavorites }) => {
  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      updateFavorites(JSON.parse(storedFavorites));
    }
  }, [updateFavorites]);

  // Update favorites in local storage when the favorites state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleRemoveFromFavorites = (cardId) => {
    removeFromFavorites(cardId); // Pass the cardId to the parent component for removal in the App.js
  };

  return (
    <div className="flex justify-center">
      <h2 className="font-epilogue font-semibold text-[20px] my-4">Favorite Cards</h2>
      {favorites.length > 0 ? (
        <div className='grid gap-x-4 gap-y-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {favorites.map((card) => (
            <div key={card.id} className="mx-5 border-0  hover:bg-[#ebd8d85a]">
              <img src={card.imageUrl} alt={card.name} />
              <p className="font-epilogue font-semibold text-[20px] m-2">{card.name}</p>
              <p>{card.type}</p>
              <button onClick={() => handleRemoveFromFavorites(card.id)}
                className="font-epilogue font-semibold text-[16px] leading-[26px]  min-h-[25px] w-[170px] p-[6px] rounded-[7px] bg-[#ebe7b7] m-2 text-center">
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite cards added yet.</p>
      )}
    </div>
  );
};

export default FavoriteList;
