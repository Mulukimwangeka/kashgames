// import React, { useState } from 'react';
// import axios from 'axios';
// import { baseUrl } from './util/commonutil';
// import GameCard from './Gamecard';




// function LoginPopup({ onLogin, subscriberId }) {  
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = async () => {
//     if (phoneNumber.trim().length !== 10) {
//       setErrorMessage('Please enter a valid phone number');
//       return;
//     }

//     // Make API call to confirm subscription
//     try {
//       const response = await axios.get(`${baseUrl}/api/v1/dailysubs/getsubs/${subscriberId}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'ngrok-skip-browser-warning': '69420',
//         },
//       });
//       if (response.data.subscribed) {
//         // User is subscribed, proceed with login
//         onLogin(phoneNumber);
//       } else {
//         setErrorMessage('Please subscribe first to log in');
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage('Error verifying subscription. Please try again later.');
//     }
//   };

//   return (
//     <div className="popup">
//       <h3>Please enter your phone number to log in</h3>
//       {errorMessage && <p className="popup__error">{errorMessage}</p>}
//       <input
//         type="text"
//         placeholder="Phone number"
//         value={phoneNumber}
//         onChange={(event) => setPhoneNumber(event.target.value)}
//       />
//       <button onClick={handleLogin}>Log In</button>
//     </div>
//   );
// }

// export default LoginPopup;
