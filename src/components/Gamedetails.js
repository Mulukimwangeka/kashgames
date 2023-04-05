import React from 'react';
import './Styles/Gamedetails.css';

function GameDetails({ title, description, image, onClose }) {
  return (
    <div className="game-details">
      <div className="game-details__content">
        <img src={image} alt={title} className="game-details__image" />
        <div className="game-details__info">
          <h3 className="game-details__title">{title}</h3>
          <p className="game-details__description">{description}</p>
          <button className="game-details__close" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
