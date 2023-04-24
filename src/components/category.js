import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Game from './Gamecard';
import { baseUrl } from './util/commonutil'
import './Styles/Category.css'

function Category(props) {
  const [games, setGames] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchGames = async () => {
      const apiEndpoint = '/api/v1/games/all';
      const fullEndpoint = `${baseUrl}${apiEndpoint}`;
      const config = {
        headers: {
          'ngrok-skip-browser-warning': '69420',
        },
      };
      const response = await fetch(fullEndpoint, config);
      const data = await response.json();
      const filteredGames = data.filter((game) => game.categoryId === Number(categoryId));
      setGames(filteredGames);
    };

    fetchGames();
  }, [categoryId]);
  

  return (
    <div className="category">
      <div className="container">
        <h2 className="category__title">{props.categoryTitle}</h2>
        <div className="category__game-list">
          {games.length > 0 ? (
            games.map((game) => (
              <Game
          key={game.id}
          id={game.id}
          title={game.title}
          description={game.description}
          images={game.image}
          productId={game.productId} // add productId here

        />

            ))
          ) : (
            <div class="loading">
              <p>Loading games...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
