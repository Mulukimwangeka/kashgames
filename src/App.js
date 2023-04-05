import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from './components/category';
import Filter from './components/filter';
// import Gamecard from './components/Gamecard';
import Header from './components/header';
import Gamedetails from './components/Gamedetails';
import Gamelist from './components/Gamelist';
import Subscription from './components/Subscription';
import Search from './components/search';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Gamelist />} />
        <Route path="/game/:id" element={<Gamedetails />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/search" element={<Search />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/category/:category" element={<Category />} />
      </Routes>
    </div>
  );
}

export default App;
