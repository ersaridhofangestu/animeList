import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Anime from './Anime';
import "./index.css"
import AnimeDetails from './pages/AnimeDetails';
import AnimeAll from './pages/AnimeAll';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Anime />} />
        <Route path="/anime/:id/:name" element={<AnimeDetails />} />
        <Route path="/anime/:pages" element={<AnimeAll />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
