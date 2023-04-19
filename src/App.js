import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from './components/category';
// import Gamecard from './components/Gamecard';
import Header from './components/header';
import Gamedetails from './components/Gamedetails';
import Gamelist from './components/Gamelist';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
  
      <Routes>
        <Route exact path="/" element={<Gamelist />} />
        <Route path="/game/:id" element={<Gamedetails />} />
        <Route path="/category/:categoryId" element={<Category/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
