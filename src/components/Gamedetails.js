import React, { useState, useRef, useEffect } from 'react';
import './Styles/Gamedetails.css';
import { baseUrl } from './util/commonutil';

function GameDetails({ title, description, images, onClose, productId ,link}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const ref = useRef(null);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePayAndPlay = (event) => {
    event.preventDefault();
    setShowPhoneForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiEndpoint = '/api/v1/dailysubs/getSubs/{subscriberId}';
    const fullEndpoint = `${baseUrl}${apiEndpoint}`;
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
      body: JSON.stringify({
        productId: productId,
        subscriberId: `254${phoneNumber.slice(1)}`,
      }),
    };
    const response = await fetch(fullEndpoint, config).catch((error) => {
      alert('Error charging your account. Please try again later.');
      console.error(error);
    });
    if (response.ok) {
      const data = await response.json();
      setSubscribed(true);
      setShowPhoneForm(false);
      alert(`You have successfully purchased ${title}!`);
      // Redirect the user to the game page
      window.location.href = link;
    } else {
      alert('Payment failed. Please try again later.');
    }
  };
  
  
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
  }, []);

  
  
  return (
    <>
      {isModalOpen && (
        <div className={`game-details${showPhoneForm ? ' expanded' : ''}`}>
          <button className="game-details__close" onClick={handleCloseModal}>x</button>
          <div className="game-details__content">
            <img src={images} alt={title} className="game-details__image" />
            <div className="game-details__info">
              <h3 className="game-details__title">{title}</h3>
              <p className="game-details__description">{description}</p>
              {!subscribed && (
                <div className="game-details__phone-form" ref={ref}>
                  {showPhoneForm ? (
                    <form onSubmit={handleSubmit}>
                      <label className="game-label">
                        Enter your phone number to play the game:
                        <input 
                         type="tel" 
                         value={phoneNumber} 
                         onChange={handlePhoneNumberChange}
                         className="game-details__phone-input" 
                         required 
                        pattern="^(?:254|\+254|0)?((?:1[01][0-9]|7[7-9])[0-9]{6}|[1-9][0-9]{8})$"
                      />


                      </label>
                      <button type="submit" className="game-details__phone-button">Submit</button>
                    </form>
                  ) : (
                    <button onClick={handlePayAndPlay} className="game-details__phone-button"> Play</button>
                  )}
                </div>
              )}
              
             
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GameDetails;
