import React , { useState } from 'react';
import { BrowserRouter as Router, Routes, Route ,useLocation} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import UserProfile from './Pages/UserProfile';
import SeedPage from './Pages/SeedPage';
import TorrentPage from './Pages/TorrentPage';
import ForumPage from './Pages/ForumPage';
import SalePage from './Pages/SalePage';
import Sidebar from "./Pages/Sidebar";
import './App.css';

// 创建一个布局组件来处理带侧边栏的页面
const MainLayout = ({ children }) => {
  const [activeMenuItem, setActiveMenuItem] = useState('personal');

   // 添加默认用户数据
  const defaultUserData = {
    username: 'zzz',
    avatar: 'https://www.baidu.com/favicon.ico',
    piv: '0',
    activeDays: '0天',
    medals: '0枚',
    onlineHours: '0小时'
  };
  
  
  return (
    <div className="main-layout">
      <Sidebar 
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
        userData={defaultUserData}  
      />
      <div className="content-area">
        {children}
      </div>
    </div>
  );
};


// 检查是否需要显示侧边栏的组件
const RouteWrapper = ({ element }) => {
  const location = useLocation();
  const isAuthPage = ['/', '/login', '/register'].includes(location.pathname);

  return isAuthPage ? (
    element
  ) : (
    <MainLayout>
      {element}
    </MainLayout>
  );
};


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
          <Route path="/user" element={<RouteWrapper element={<UserProfile />} />} />
          <Route path="/seed" element={<RouteWrapper element={<SeedPage />} />} />
          <Route path="/torrent" element={<RouteWrapper element={<TorrentPage />} />} />
          <Route path="/forum" element={<RouteWrapper element={<ForumPage />} />} />
          <Route path="/SalePage" element={<RouteWrapper element={<SalePage />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;