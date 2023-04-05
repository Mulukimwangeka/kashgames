import React, { useState, useEffect } from 'react';
import GameCard from './Gamecard';
import './Styles/Gamelist.css'

function GamesList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setGames(data);
    }

    fetchGames();
  }, []);

  return (
    
    <div className="games-list">
      {games.map(game => (
        <GameCard
          key={game.id}
          title={game.title}
          image={game.image}
          description={game.description}
          price={game.price}
        />
      ))}
    </div>
  );
}

export default GamesList;
