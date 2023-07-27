import React from "react";
import { Link } from "react-router-dom";

const CardList = ({ cards, addToFavorites, isFetching, favorites }) => {
  return (
    <div className='grid-holder'>
      {isFetching ? (
        <div className="spinner-container">
          <div className="spinner">Loading</div>
        </div>
      ) : (
        <div className='card-grid'>
          {cards.map((card) => (
            <div key={card.id}>
              <img src={card.images.small} alt={card.name} />
              <p>{card.name}</p>
              <p>{card.type}</p>
              <button
                onClick={() => addToFavorites(card)}
                disabled={favorites.some((favorite) => favorite.id === card.id)}
              >
                {favorites.some((favorite) => favorite.id === card.id)
                  ? "Added to Favorites"
                  : "Add to Favorites"}
              </button>
              <Link to={`/cards/${card.id}`} state={{ card }}>View Details</Link>
              {/* Pass the card object as state through the Link */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
