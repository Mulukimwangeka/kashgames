import React, { useState } from 'react';
import './Styles/Gamedetails.css';

function GameDetails({ title, description, image, onClose }) {
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayAndPlay = () => {
    setShowPhoneForm(true);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (phoneNumber.length === 10) {
      // Call an API to subscribe the user and enable them to play the game
      alert(`You have subscribed with phone number ${phoneNumber} and can now play the game!`);
      setShowPhoneForm(false);
      onClose();
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  return (
    <div className="game-details">
      <div className={`game-details__content ${showPhoneForm ? 'hidden' : ''}`}>
        <img src={image} alt={title} className="game-details__image" />
        <div className="game-details__info">
          <h3 className="game-details__title">{title}</h3>
          <p className="game-details__description">{description}</p>
          <div className="game-details__buttons">
            <button className="game-details__button" onClick={handlePayAndPlay}>Pay &amp; Play</button>
          </div>
          <button className="game-details__close" onClick={onClose}>X</button>
        </div>
      </div>
      {showPhoneForm && (
        <div className="game-details__phone-form">
          <form onSubmit={handleSubmit}>
            <label className='game-label'>
              Please enter your 10-digit phone number:
              <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
            </label>
            <button type="submit">Subscribe and Play</button>
          </form>
          <button className="game-details__close2" onClick={() => setShowPhoneForm(false)}>X</button>
        </div>
      )}
    </div>
  );
}

export default GameDetails;
