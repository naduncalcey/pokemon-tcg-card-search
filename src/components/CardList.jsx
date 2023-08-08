import React from "react";
import { Link } from "react-router-dom";

const CardList = ({ cards, addToFavorites, isFetching, favorites }) => {
  return (
    <div className='flex justify-center'>
      {isFetching ? (
        <div className="spinner-container">
          <div className="spinner">Loading</div>
        </div>
      ) : (
        <div className='grid gap-x-4 gap-y-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {cards.map((card) => (
            <div key={card.id} className="mx-5 border-0  hover:bg-[#ebd8d85a]" >
              <img src={card.images.small} alt={card.name} />
              <p className="font-epilogue font-semibold text-[20px] m-2">{card.name}</p>
              <p>{card.type}</p>
              <div className="flex flex-col justify-center">
                <button
                  onClick={() => addToFavorites(card)}
                  disabled={favorites.some((favorite) => favorite.id === card.id)}
                  className="font-epilogue font-semibold text-[16px] leading-[26px]  min-h-[25px] w-[170px] p-[6px] rounded-[7px] bg-[#ebe7b7] m-2 text-center"
                >
                  {favorites.some((favorite) => favorite.id === card.id)
                    ? "Added to Favorites"
                    : "Add to Favorites"}
                </button>
                <Link to={`/cards/${card.id}`} state={{ card }} className="font-epilogue font-semibold text-[16px] leading-[26px]  min-h-[25px] w-[170px] p-[6px] rounded-[7px] bg-[#ebe7b7] m-2 text-center">View Details</Link>
                {/* Pass the card object as state through the Link */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
