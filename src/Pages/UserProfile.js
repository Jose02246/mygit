import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import api from './api';

const UserProfile = () => {
  // 用户数据状态，初始为空，后端拉取后赋值
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // 新增加载状态
  const [error, setError] = useState(null);        
  const baseURL = 'http://192.168.10.117:8081/api';  // 新增错误状态

  // 编辑状态
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const [tempAvatar, setTempAvatar] = useState('');

  // 签到状态（示例用，实际可改为接口交互）
  const [checkedDays, setCheckedDays] = useState([1, 2, 3, 16]);
  const [consecutiveDays, setConsecutiveDays] = useState(1);
  const [totalCheckins, setTotalCheckins] = useState(4);
  const [makeupCards, setMakeupCards] = useState(1);
  const [showCheckinSuccess, setShowCheckinSuccess] = useState(false);

  const navigate = useNavigate();

  // 新增：从后端接口获取用户数据
 useEffect(() => {
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get('/auth/status');  // 注意await
      const data = response.data;
      const user = data.user.user;  // ✅ 这里定义了 user

      console.log('获取到的数据:', data);  // 打印数据到控制台
       if (user.avatar && !user.avatar.startsWith('http')) {
        user.avatar = baseURL + user.avatar;
      }

      setUserData(response.data.user.user); 
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
      const response = await api.post('/users/avatar', formData);
      //const baseURL = 'http://192.168.10.117:8081/api'; // 你的服务器地址
      const fullAvatarUrl = baseURL + response.data;
      console.log("上传成功，头像 URL:", fullAvatarUrl);

      // 上传成功后，更新临时头像和最终头像
      alert("头像上传成功！");
      setTempAvatar(fullAvatarUrl);

      // 如果想实时预览，临时头像就更新了，保存后才更新 userData.avatar
    } catch (error) {
      console.error("头像上传失败:", error);
      alert("头像上传失败");
    }
  };



  // 签到处理函数
  const handleCheckIn = (day) => {
    const today = new Date().getDate();
    if (day === today && !checkedDays.includes(day)) {
      const newCheckedDays = [...checkedDays, day];
      setCheckedDays(newCheckedDays);
      setTotalCheckins(totalCheckins + 1);
      
      // 简单计算连续签到天数（实际应根据日期连续性计算）
      const newConsecutiveDays = consecutiveDays + 1;
      setConsecutiveDays(newConsecutiveDays);
      
      // 计算奖励
      let bonus = 10;
      if (newConsecutiveDays % 10 === 0) bonus += newConsecutiveDays === 10 ? 500 : 1000;
      
      // 更新魔力值
      setUserData({
        ...userData,
        bonusPoints: (parseInt(userData.bonusPoints) + bonus).toString()
      });
      
      setShowCheckinSuccess(true);
      setTimeout(() => setShowCheckinSuccess(false), 3000);
    }
  };

  // 补签处理函数
  const handleMakeupCheckIn = (day) => {
    if (makeupCards > 0 && !checkedDays.includes(day)) {
      setCheckedDays([...checkedDays, day]);
      setMakeupCards(makeupCards - 1);
      setTotalCheckins(totalCheckins + 1);
      
      // 更新魔力值
      setUserData({
        ...userData,
        bonusPoints: (parseInt(userData.bonusPoints) + 10).toString()
      });
    }
  };

  // 日历数据 
  const calendarData = {
    year: 2025,
    month: 5,
    weeks: [
      [27, 28, 29, 30, 1, 2, 3],
      [4, 5, 6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15, 16, 17],
      [18, 19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30, 31]
    ]
  };

  const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
};

const formatUnixTimeToDays = (timestamp) => {
  if (!timestamp) return '无时间';
  const days = Math.floor(timestamp / (1000 * 60 * 60 * 24));
  return `已加入 ${days} 天`;
};

const formatSecondsToHours = (seconds) => {
  if (!seconds) return '0 小时';
  const hours = Math.floor(seconds / (3600*1000));
  return `累计做种 ${hours} 小时`;
};



  // 获取今天是几号
  const today = new Date().getDate();

  // 加载中或错误时的界面
  if (isLoading) {
    return <div className="user-profile-container">正在加载用户数据...</div>;
  }

  if (error) {
    return <div className="user-profile-container">错误：{error}</div>;
  }

  if (!userData) {
    // 兜底防护，避免空数据渲染报错
    return <div className="user-profile-container">未获取到用户数据</div>;
  }

  return (
    <div className="user-profile-container">
      {/* 侧边栏 */}
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
            
            <div className="user-class">{userData.userClass}</div>
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

          {isEditing && (
            <div className="edit-controls">
              <button className="save-btn" onClick={handleSaveProfile}>保存</button>
              <button className="cancel-btn" onClick={handleCancelEdit}>取消</button>
            </div>
          )}
        </div>

        <nav className="side-menu">
          <div className="menu-title">功能导航</div>
          <button className="menu-item active">首页</button>
          <button className="menu-item">论坛</button>
          <button className="menu-item" onClick={() => navigate('/torrent')}>种子</button>
          <button className="menu-item" onClick={handlePublishClick}>发布</button>
          <button className="menu-item" onClick={() => navigate('/sale')}>积分商城</button>
          <button className="menu-item">设置</button>
        </nav>

        <div className="welcome-message">
          尊敬的{userData.username}会员<br />
          欢迎您使用本软件！
        </div>
      </div>

      {/* 主内容区 */}
      <div className="main-content">
        <div className="content-header">
          <h2>个人数据</h2>
          <button className="refresh-btn" onClick={() => window.location.reload()}>F5 刷新</button>
        </div>

        <div className="main-content-wrapper">
          <div className="data-table">
            <div className="table-header">
              <div className="header-item">用户名</div>
              <div className="header-item">上传量</div>
              <div className="header-item">下载量</div>
              <div className="header-item">邮件地址</div>
              <div className="header-item">入站时间</div>
              <div className="header-item">做种时间</div>
              <div className="header-item">称号</div>
              <div className="header-item">个性签名</div>
            </div>

          <div className="table-row">
  <div className="row-item">{userData.username}</div>
  <div className="row-item">{formatBytes(userData.uploaded)}</div>
  <div className="row-item">{formatBytes(userData.downloaded)}</div>
  <div className="row-item">{userData.email}</div>
  <div className="row-item">{formatUnixTimeToDays(userData.createdAt)}</div>
  <div className="row-item">{formatSecondsToHours(userData.seedingTime)}</div>
  <div className="row-item">{userData.customTitle}</div>
  <div className="row-item">{userData.signature}</div>
</div>


          </div>

          {/* 签到组件等其他保持不变 */}
          <div className="checkin-container">
            {showCheckinSuccess && (
              <div className="checkin-success">
                <h3>签到成功</h3>
                <p>这是您的第 {totalCheckins} 次签到，已连续签到 {consecutiveDays} 天。</p>
                <p>本次签到获得 10 魔力值，十连签到额外奖励500魔力，二十连签到额外奖励1000魔力。</p>
              </div>
            )}
            <div className="calendar">
              <h3>签到日历 - {calendarData.year}年{calendarData.month}月</h3>
              <table>
                <thead>
                  <tr>
                    <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
                  </tr>
                </thead>
                <tbody>
                  {calendarData.weeks.map((week, i) => (
                    <tr key={i}>
                      {week.map((day, idx) => {
                        const isChecked = checkedDays.includes(day);
                        const isToday = day === today;
                        return (
                          <td
                            key={idx}
                            className={`${isChecked ? 'checked-day' : ''} ${isToday ? 'today' : ''}`}
                            onClick={() => {
                              if (isToday) handleCheckIn(day);
                            }}
                          >
                            {day}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="makeup-section">
              <h4>补签卡剩余：{makeupCards} 张</h4>
              <div className="makeup-days">
                {/* 允许补签的日期示例 */}
                {[...Array(5).keys()].map(i => {
                  const day = today - i - 1;
                  if (day <= 0) return null;
                  if (checkedDays.includes(day)) return null;
                  return (
                    <button key={day} onClick={() => handleMakeupCheckIn(day)}>
                      补签 {day} 号
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="user-bonus">
              魔力值：{userData.bonusPoints}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
