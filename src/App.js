import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import UserProfile from './Pages/UserProfile';
import SeedPage from './Pages/SeedPage';
import TorrentPage from './Pages/TorrentPage';
import ForumPage from './Pages/ForumPage';
import PointsShop from './Pages/PointsShop';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* 登录/注册路由 - 使用视频背景 */}
          <Route path="/" element={
            <div className="video-background">
              <video autoPlay muted loop>
                <source src="/out2.mp4" type="video/mp4" />
              </video>
              <LoginPage />
            </div>
          } />
          <Route path="/login" element={
            <div className="video-background">
              <video autoPlay muted loop>
                <source src="/out2.mp4" type="video/mp4" />
              </video>
              <LoginPage />
            </div>
          } />
          <Route path="/register" element={
            <div className="video-background">
              <video autoPlay muted loop>
                <source src="/out2.mp4" type="video/mp4" />
              </video>
              <RegisterPage />
            </div>
          } />

          {/* 其他路由 - 使用默认背景 */}
            <Route path="/user" element={<UserProfile />} />
            <Route path="/seed" element={<SeedPage />} />
            <Route path="/torrent" element={<TorrentPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/points-shop" element={<PointsShop />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;