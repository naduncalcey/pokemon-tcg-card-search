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
    <div>
      <h2>Favorite Cards</h2>
      {favorites.length > 0 ? (
        <div>
          {favorites.map((card) => (
            <div key={card.id}>
              <img src={card.imageUrl} alt={card.name} />
              <p>{card.name}</p>
              <p>{card.type}</p>
              <button onClick={() => handleRemoveFromFavorites(card.id)}>
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
