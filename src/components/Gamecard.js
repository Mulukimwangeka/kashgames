import React, { useState } from 'react';
import './Styles/Gamecard.css';
import GameDetails from './Gamedetails';

function Gamecard({ title, image, description, price }) {
  const [showModal, setShowModal] = useState(false);

  const handlePlayNow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="gamecard">
      <img src={image} alt={title} className="gamecard__image" />
      <div className="gamecard__content">
        <h3 className="gamecard__title">{title}</h3>
        <button className="gamecard__button" onClick={handlePlayNow}>Play Now</button>
        {showModal && <GameDetails title={title} image={image} description={description} price={price} onClose={handleClose} />}
      </div>
    </div>
  );
}

export default Gamecard;
