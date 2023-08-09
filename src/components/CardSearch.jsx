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
    <div className="flex flex-row gap-[25px]">
      {!isCardDetailPage && !isFavoritesPage && (
        <>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="enter a pokemon"
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px] "
          />
          <button onClick={handleSearch}
            className="font-epilogue font-semibold text-[16px] leading-[26px]  min-h-[25px] min-w-[100px] p-[6px] rounded-[7px] bg-[aquamarine]">Search</button>
          {isFetching && <p className="font-epilogue text-[16px] leading-[26px] min-h-[25px] min-w-[100px] pt-[12px]">Loading cards...</p>}
        </>
      )}
    </div>
  );
};

export default CardSearch;