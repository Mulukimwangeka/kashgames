import React, { useState, useEffect } from 'react';
import GameCard from './Gamecard';
import './Styles/Gamelist.css'

function GamesList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
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
        images={game.images}
        className="game-card"
      />

      ))}
    </div>
  );
}

export default GamesList;
