// Sidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"; // 单独提取侧边栏样式

const Sidebar = ({ activeMenuItem, setActiveMenuItem, userData }) => {
  const navigate = useNavigate();

  const handleNavigation = (path, menuItem) => {
    navigate(path);
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="sidebar">
      <div className="user-basic-info">
        <div className="avatar-container">
          <img src={userData.avatar} alt="用户头像" className="user-avatar" />
          <div className="username">{userData.username}</div>


          <span className="user-class">
            <span style={{
            display: 'inline-block',
            color: '#00FFFF',
            fontSize: '12px',
            fontWeight: 'bold',
            textShadow: '0 0 4px #00FFFF, 0 0 8px #00FFFF',
            padding: '2px 6px',
            border: '1px solid rgba(0,255,255,0.3)',
            borderRadius: '4px',
            background: 'rgba(0,100,100,0.2)'
        }}>
        Nexus Master</span>
         </span>

        </div>

        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-label">PIV</span>
            <span className="stat-value">{userData.piv}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">活跃</span>
            <span className="stat-value">{userData.activeDays}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">勋章</span>
            <span className="stat-value">{userData.medals}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">在线</span>
            <span className="stat-value">{userData.onlineHours}</span>
          </div>
        </div>
      </div>

      <nav className="side-menu">
        <div className="menu-title">功能导航</div>
        <button
          className={`menu-item ${activeMenuItem === "personal" ? "active" : ""}`}
          onClick={() => handleNavigation("/user","personal")}
        >
          个人中心
        </button>
        <button
          className={`menu-item ${activeMenuItem === "forum" ? "active" : ""}`}
          onClick={() => handleNavigation("/forum", "forum")}
        >
          论坛
        </button>
        <button
          className={`menu-item ${activeMenuItem === "torrent" ? "active" : ""}`}
          onClick={() => handleNavigation("/torrent", "torrent")}
        >
          种子
        </button>
        <button
          className={`menu-item ${activeMenuItem === "publish" ? "active" : ""}`}
          onClick={() => handleNavigation("/seed", "publish")}
        >
          发布
        </button>
        <button
          className={`menu-item ${activeMenuItem === "shop" ? "active" : ""}`}
          onClick={() => handleNavigation("/points-shop", "shop")}
        >
          积分商城
        </button>
        <button
          className={`menu-item ${activeMenuItem === "settings" ? "active" : ""}`}
          onClick={() => setActiveMenuItem("settings")}
        >
          做种奖励
        </button>
      </nav>

      <div className="welcome-message">
        尊敬的{userData.username}会员<br />
        欢迎您使用本软件！
      </div>
    </div>
  );
};

export default Sidebar;