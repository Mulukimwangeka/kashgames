import React, { useState, useRef, useEffect } from 'react';
import './Styles/Gamedetails.css';
import axios from 'axios';
import { baseUrl } from './util/commonutil';

function GameDetails({ title, description, images, onClose, link }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const ref = useRef(null);

  const handlePhoneNumberChange = (event) => {
    const inputNumber = event.target.value.trim();
    const formattedNumber = inputNumber.replace(/^(0|\+254)/, '2547');
    setPhoneNumber(formattedNumber);
  };


  const handlePayAndPlay = (event) => {
    event.preventDefault();
    setShowPhoneForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
  
    const chargeEndpoint = `${baseUrl}/api/v1/charge/initiate`;
  
    const chargeRequestData = JSON.stringify({
      subscriberId: phoneNumber,
      productId: "fb3298b9-34c5-4b3d-a2f7-469e71fa9941",
      amount: 5.0
    });
  
    const chargeConfig = {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',

      }
    };
  
    try {
      const chargeResponse = await axios.post(chargeEndpoint, chargeRequestData, chargeConfig);
  
      if (chargeResponse.status !== 200) {
        throw new Error(`Charging failed with status code ${chargeResponse.status}`);
      }
  
      const subscribeEndpoint = 'http://163.172.170.26:9097/api/request/subscribe';
      const subscribeRequestData = {
        msisdn: phoneNumber,
        productId: "fb3298b9-34c5-4b3d-a2f7-469e71fa9941"
      };
      const subscribeConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const subscribeResponse = await axios.post(subscribeEndpoint, subscribeRequestData, subscribeConfig);
  
      if (subscribeResponse.status !== 200) {
        throw new Error(`Subscription failed with status code ${subscribeResponse.status}`);
      }
  
      setSubscribed(true);
      setShowPhoneForm(false);
  
      sessionStorage.setItem('phoneNumber', phoneNumber);
  
      alert(`You have successfully subscribed to the charging service!`);
      window.open(link, '_blank');
  
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        alert(`Error: ${error.response.data}`);
      } else if (error.request) {
        alert('Error: Network error. Please check your internet connection and try again later.');
      } else {
        alert('Error: Something went wrong. Please try again later.');
      }
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
