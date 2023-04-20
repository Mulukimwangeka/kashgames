import React, { useState } from 'react';
import './Styles/Gamecard.css';
import GameDetails from './Gamedetails';

function GameCard({title, images, description, subscriberId, productId,link }) {
  const [showModal, setShowModal] = useState(false);

  const handlePlayNow = () => {
    const loggedIn = !!sessionStorage.getItem('subscriberId');
    if (loggedIn) {
      window.open(link, '_blank');
    } else {
      // inform the user that they need to be subscribed before showing the modal
      alert('You need to be subscribed to play this game.');
      setShowModal(true);
    }
  };
  
  // set expiration time to 24 hours from now
  const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000);
  sessionStorage.setItem('expirationTime', expirationTime);
  
  // check if session storage has expired
  const hasSessionExpired = () => {
    const currentTime = new Date().getTime();
    const expirationTime = sessionStorage.getItem('expirationTime');
    return expirationTime && (currentTime >= expirationTime);
  };
  
  // clear session storage if it has expired
  if (hasSessionExpired()) {
    sessionStorage.clear();
  }
  
  

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
              images={images}
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
