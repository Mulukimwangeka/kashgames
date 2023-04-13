import React, { useState } from 'react';
import './Styles/Gamecard.css';
import GameDetails from './Gamedetails';

function GameCard({ id, title, images, description }) {
  const [showModal, setShowModal] = useState(false);

  const handlePlayNow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="game-card">
      <img src={images} alt={title} className="game-card__image" />
      <div className="game-card__content">
        <h3 className="game-card__title">{title}</h3>
        <p className="game-card__description">{description}</p>
        <button className="game-card__button" onClick={handlePlayNow}>
          Play
        </button>
        {showModal && (
          <GameDetails
            id={id}
            title={title}
            images={images}
            description={description}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}

export default GameCard;
