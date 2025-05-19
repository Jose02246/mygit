import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SeedPage from './Pages/SeedPage'; 
import UserProfile from './Pages/UserProfile'; 
<<<<<<< HEAD
=======
import SalePage from './Pages/SalePage';
>>>>>>> d515fb0 (第一次上传)
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/seed" element={<SeedPage />} /> 
<<<<<<< HEAD
=======
            <Route path="/sale" element={<SalePage />} />
>>>>>>> d515fb0 (第一次上传)
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
