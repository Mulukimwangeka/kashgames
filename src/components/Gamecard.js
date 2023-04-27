import React, { useState } from 'react';
import './Styles/Gamecard.css';
import GameDetails from './Gamedetails';
import axios from 'axios';
import { baseUrl } from './util/commonutil';

function GameCard({ title, images, description, phoneNumber, productId, link }) {
  const [showModal, setShowModal] = useState(false);

  const handlePlayNow = async () => {
    const subscriberId = sessionStorage.getItem('phoneNumber');
    console.log(subscriberId)
    const loggedIn = !!subscriberId;
  
    if (loggedIn) {
      // Check if the subscriber is fully subscribed
      try {
        const response = await axios.get(`${baseUrl}/api/v1/dailysubs/getsubs/{subscriberId}`, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',

          }
        });
        

        if (response.data.fullySubscribed) {
          window.open(link, '_blank');
        } else {
          alert('You need to be fully subscribed to play this game.');
          setShowModal(true);
        }
      } catch (error) {
        console.error(error);
        alert('Failed to check subscription status. Please try again later.');
        setShowModal(true);

      }
    } else {
      alert('You need to be subscribed to play this game.');
      setShowModal(true);
    }
  };
  

  const handleClose = (event) => {
    setShowModal(false);
  };

  return (
    <div className="game-card" data-phone-number={phoneNumber} data-product-id={productId}>
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
              phoneNumber={phoneNumber}
              productId={productId} 
              link={link}
              subscriberId={phoneNumber}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GameCard;
