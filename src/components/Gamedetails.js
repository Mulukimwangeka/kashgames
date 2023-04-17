import React, { useState, useRef, useEffect } from 'react';
import './Styles/Gamedetails.css';
import { baseUrl } from './util/commonutil';

function GameDetails({ title, description, images, onClose, productId }) {
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productID,setProductId] = useState(productId); // Set the initial value of productID to the productId prop

  const ref = useRef(null);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePayAndPlay = (productId) => {
    setShowPhoneForm(true);
    console.log(productId)
    setProductId(productId);
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (phoneNumber.length === 10) {
      const apiEndpoint = '/api/v1/subs/check';
      const fullEndpoint = `${baseUrl}${apiEndpoint}`;
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify({
          productId: productID, // Use the productID state variable here
          subscriberId: phoneNumber,
        }),
      };
      // Make API call to check subscription status
      const response = await fetch(fullEndpoint, config).catch(error => {
        alert('Error checking subscription status. Please try again later.');
        console.error(error);
      });
      if (response.ok) {
        const data = await response.json();
        if (data.subscribed) {
          alert(`You are subscribed to ${title} and can now play the game!`);
          setShowPhoneForm(false);
          onClose();
        } else {
          alert(`Sorry, you are not subscribed to ${title}.`);
        }
      } else {
        alert('Error checking subscription status. Please try again later.');
      }
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };
  
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      

      setShowPhoneForm(false);
      
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
  

  return (
    <div className="game-details">
      <div className={`game-details__content ${showPhoneForm ? 'hidden' : ''}`}>
        <img src={images} alt={title} className="game-details__image" />
        <div className="game-details__info">
          <h3 className="game-details__title">{title}</h3>

          <p className="game-details__description">{description}</p>
          <div className="game-details__buttons">
            <button className="game-details__button" onClick={() => handlePayAndPlay(productID)}>Pay &amp; Play</button>
          </div>
          <button className="game-details__close" onClick={onClose}>X</button>
        </div>
      </div>
      {showPhoneForm && (
        <div className="game-details__phone-form" ref={ref}>
          <form onSubmit={handleSubmit}>
            <label className='game-label'>
              Please enter your 10-digit phone number:
              <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} />
            </label>
            <button type="submit">Subscribe and Play</button>
          </form>
          <button className="game-details__close2" onClick={() => { setShowPhoneForm(false); onClose(); }}>X</button>
        </div>
      )}
    </div>
  );
}

export default GameDetails;