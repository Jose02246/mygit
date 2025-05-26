import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import api from './api';

const Sidebar = ({ activeMenuItem, setActiveMenuItem, userData: initialUserData }) => {
  const navigate = useNavigate();
  
  // 状态管理
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [tempAvatar, setTempAvatar] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(initialUserData || {
    username: '',
    avatar: '',
  });

  // 从后端接口获取用户数据
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get('/auth/status');
        const data = response.data;
        const user = data.user.user;

        console.log('获取到的数据:', data);
        
        // 确保 baseURL 已定义（根据你的实际配置）
        const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/api';
        
        if (user.avatar && !user.avatar.startsWith('http')) {
          user.avatar = baseURL + user.avatar;
        }

        setUserData(user); 
      } catch (err) {
        setError(err.message || '获取用户数据失败');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handlePublishClick = () => {
    navigate('/seed');
  };

  const handleEditProfile = () => {
    if (!userData) return;
    setIsEditing(true);
    setTempUsername(userData.username);
    setTempAvatar(userData.avatar);
  };

  const handleSaveProfile = () => {
    setUserData(prev => ({
      ...prev,
      username: tempUsername,
      avatar: tempAvatar,
    }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };
 
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("请选择图片文件");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/api';
      const response = await api.post('/users/avatar', formData);
      const fullAvatarUrl = baseURL + response.data;
      console.log("上传成功，头像 URL:", fullAvatarUrl);

      alert("头像上传成功！");
      setTempAvatar(fullAvatarUrl);
    } catch (error) {
      console.error("头像上传失败:", error);
      alert("头像上传失败");
    }
  };

  const handleNavigation = (path, menuItem) => {
    navigate(path);
    setActiveMenuItem(menuItem);
  };

  return (
    <div className="sidebar">
      <div className="user-basic-info">
        <div className="avatar-container">
          <img
           src={isEditing ? tempAvatar || userData.avatar : userData.avatar} alt="用户头像" className="user-avatar" />
            {isEditing ? (
              <div className="avatar-edit-controls">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload" className="edit-avatar-btn">
                  更换头像
                </label>
              </div>
            ) : (
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                编辑资料
              </button>
            )}
            
            {isEditing ? (
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                className="username-edit-input"
              />
            ) : (
              <div className="username">{userData.username}</div>
            )}

          <div className="user-class">
          <span>{userData.userClass || '普通'}</span></div>

        </div>



        {isEditing && (
            <div className="edit-controls">
              <button className="save-btn" onClick={handleSaveProfile}>保存</button>
              <button className="cancel-btn" onClick={handleCancelEdit}>取消</button>
            </div>
          )}
        
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
          onClick={() => handleNavigation("/SalePage", "shop")}
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