import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const CardSearch = ({ setCards }) => {
  const location = useLocation();
  const isCardDetailPage = location.pathname.startsWith("/cards/");
  const isFavoritesPage = location.pathname === "/favorites";

  const [searchTerm, setSearchTerm] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleSearch = async () => {
    const apiKey = "YOUR_API_KEY";
    let apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}`;

    try {
      setIsFetching(true);
      const response = await fetch(apiUrl, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const data = await response.json();
      setCards(data.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
      {!isCardDetailPage && !isFavoritesPage && (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          {isFetching && <p>Loading cards...</p>}
        </>
      )}
    </div>
  );
};

export default CardSearch;