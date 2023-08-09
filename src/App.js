import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CardSearch from "./components/CardSearch";
import CardList from "./components/CardList";
import FavoriteList from "./components/FavoriteList";
import CardDetail from "./components/CardDetails";

// import "./styles.css"; // Import the styles.css file

const App = () => {
  const [cards, setCards] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [isFetching, setIsFetching] = useState(true);
  const [mode, setMode] = useState("light"); // "light" or "dark"

  // Function to toggle between light and dark mode
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Fetch cards and store in local state
  const fetchCards = useCallback(async () => {
    const apiKey = "YOUR_API_KEY";
    const apiUrl = "https://api.pokemontcg.io/v2/cards?q=name:";

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
  }, []);

  // Fetch cards only if the cards state is empty
  useEffect(() => {
    if (cards.length === 0) {
      fetchCards();
    }
  }, [cards, fetchCards]);

  // Save favorites to local storage when the favorites state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (card) => {
    const newFavorite = {
      id: card.id,
      name: card.name,
      imageUrl: card.images.small, // Adjust this based on the actual image URL property in the card object
    };

    setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
  };

  const removeFromFavorites = (cardId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((card) => card.id !== cardId)
    );
  };

  return (
    <Router>
      <div className="relative h-full w-full overflow-y-auto">
        <div className="fixed bg-[#ede7e1] h-55 w-full mb-2">
          <div className=' top-0 left-0 w-full flex justify-between items-center  py-[16px] px-[20px]'>
            <div >
              <h1 className='font-semibold text-3xl'>Pokémon TCG Search</h1>
            </div>
            <div className='top-bar-child-align-center'>
              <button className='p-[10px] bg-[bisque] border-1 rounded-lg border-[#614a00]' onClick={toggleMode}>{mode === "dark" ? "Dark" : "Light"}</button>
            </div>
          </div>
          <nav className='flex top-[69.77px] left-0 gap-[40px] py-[16px] px-[20px] '>
            <div>
              <Link to="/" className="text-[#101010] p-[10px] bg-[aquamarine] rounded-[7px]">Search</Link>
            </div>
            <div>
              <Link to="/favorites" className="text-[#101010] p-[10px] bg-[aquamarine] rounded-[7px]">Favorites</Link>
            </div>
          </nav>
          <div className='top-[120.66px] left-0 py-[16px] px-[20px] '>
            <CardSearch setCards={setCards} isFetching={isFetching} />
          </div>

        </div>
        <div className='py-[16px] px-[20px] mt-56'>
          <Routes>
            <Route
              path="/"
              element={
                <CardList
                  cards={cards}
                  addToFavorites={addToFavorites}
                  isFetching={isFetching}
                  favorites={favorites}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <FavoriteList
                  favorites={favorites}
                  removeFromFavorites={removeFromFavorites}
                  updateFavorites={setFavorites}
                />
              }
            />
            <Route path="/cards/:id" element={<CardDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;