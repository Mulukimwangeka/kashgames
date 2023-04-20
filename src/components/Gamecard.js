import React, { useState } from 'react';
import './Styles/Gamecard.css';
import GameDetails from './Gamedetails';

function GameCard({title, images, description, subscriberId, productId, link }) {
  const [showModal, setShowModal] = useState(false);

  const handlePlayNow = () => {
    console.log(link);
    window.open(link, '_blank'); //game link in a new tab
  };

  const handleClose = (event) => {
    setShowModal(false);
  };

  return (
    <div className="game-card" data-subscriber-id={subscriberId} data-product-id={productId}>
      <img src={images} alt={title} className="game-card__image" />
      <div className="game-card__content">
        <h3 className="game-card__title">{title}</h3>
        <button className="game-card__button" onClick={handlePlayNow}>
          Play
        </button>
        {showModal && (
          <div className="overlay">
            <GameDetails
              title={title}
              description={description}
              image={images}
              onClose={(event) => handleClose(event)}
              subscriberId={subscriberId}
              productId={productId} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GameCard;


