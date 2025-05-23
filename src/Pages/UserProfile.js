import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    // 用户数据状态
  const [userData, setUserData] = useState({
  username: 'zzz',
  email: '0987432@qq.com',
  customTitle: '测试用户',
  signature: '这个用户很懒，还没有个性签名',
  downloaded: '26.67 MB',
  uploaded: '0 B',
  realDownloaded: '26.67 MB',
  realUploaded: '0 B',
  score: '317.79',
  inviteSlot: 0,
  seedingTime: '103天 10小时',
  downloadBandwidth: '100mbps',
  uploadBandwidth: '100mbps',
  createdAt: '2023-03-03',
  piv: '0',
  activeDays: '0天',
  medals: '0枚',
  onlineHours: '0小时',
  avatar: 'https://www.baidu.com/favicon.ico'
});


  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(userData.username);
  const [tempAvatar, setTempAvatar] = useState(userData.avatar);
  const [activeMenuItem, setActiveMenuItem] = useState('personal'); // 新增状态跟踪激活菜单项
  
  // 签到相关状态
  const [checkedDays, setCheckedDays] = useState([1, 2, 3, 16]); // 示例已签到日期
  const [consecutiveDays, setConsecutiveDays] = useState(1); // 连续签到天数
  const [totalCheckins, setTotalCheckins] = useState(4); // 总签到次数
  const [makeupCards, setMakeupCards] = useState(1); // 补签卡数量
  const [showCheckinSuccess, setShowCheckinSuccess] = useState(false); // 是否显示签到成功提示
  
  const navigate = useNavigate();

  const handlePublishClick = () => {
    navigate('/seed');
    setActiveMenuItem('publish'); // 设置激活状态
  };

const handleNavigation = (path, menuItem) => {
        navigate(path);
        setActiveMenuItem(menuItem); // 设置激活状态
    };

  const handleEditProfile = () => {
    setIsEditing(true);
    setTempUsername(userData.username);
    setTempAvatar(userData.avatar);
  };

  const handleSaveProfile = () => {
    setUserData({
      ...userData,
      username: tempUsername,
      avatar: tempAvatar
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
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
  // 获取今天是几号
  const today = new Date().getDate();
  

  return (
    <div className="user-profile-container">

<div className="main-content">
  <div className="content-header">
    <h2>个人中心</h2>
    <button className="refresh-btn" onClick={() => window.location.reload()}>
      <i className="fas fa-sync-alt"></i> 刷新
    </button>
  </div>

  {/* 用户数据概览 */}
  <div className="dashboard-grid">
    {/* 基本信息卡片 */}
    <div className="dashboard-card">
      <h3><i className="fas fa-user"></i> 基本信息</h3>
      <div className="card-content">
        <div className="info-row">
          <span className="info-label">用户名:</span>
          <span className="info-value">{userData.username || 'zzz'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">邮箱:</span>
          <span className="info-value">0987432@qq.com</span>
        </div>
        <div className="info-row">
          <span className="info-label">称号:</span>
          <span className="info-value">测试用户</span>
        </div>
        <div className="info-row">
          <span className="info-label">签名:</span>
          <span className="info-value">这个用户很懒，还没有个性签名</span>
        </div>
      </div>
    </div>

    {/* 流量统计卡片 */}
    <div className="dashboard-card">
      <h3><i className="fas fa-chart-line"></i> 流量统计</h3>
      <div className="card-content">
        <div className="info-row">
          <span className="info-label">上传量:</span>
          <span className="info-value">0 B</span>
        </div>
        <div className="info-row">
          <span className="info-label">下载量:</span>
          <span className="info-value">26.67 MB</span>
        </div>
        <div className="info-row">
          <span className="info-label">真实上传:</span>
          <span className="info-value">0 B</span>
        </div>
        <div className="info-row">
          <span className="info-label">真实下载:</span>
          <span className="info-value">26.67 MB</span>
        </div>
        <div className="info-row">
          <span className="info-label">分享率:</span>
          <span className="info-value">0.00</span>
        </div>
      </div>
    </div>

    {/* 做种统计卡片 */}
    <div className="dashboard-card">
      <h3><i className="fas fa-seedling"></i> 做种统计</h3>
      <div className="card-content">
        <div className="info-row">
          <span className="info-label">做种时间:</span>
          <span className="info-value">103天 10小时</span>
        </div>
        <div className="info-row">
          <span className="info-label">当前做种:</span>
          <span className="info-value">0个</span>
        </div>
        <div className="info-row">
          <span className="info-label">上传带宽:</span>
          <span className="info-value">100mbps</span>
        </div>
        <div className="info-row">
          <span className="info-label">下载带宽:</span>
          <span className="info-value">100mbps</span>
        </div>
      </div>
    </div>

    {/* 积分与成就卡片 */}
    <div className="dashboard-card">
      <h3><i className="fas fa-coins"></i> 积分与成就</h3>
      <div className="card-content">
        <div className="info-row">
          <span className="info-label">魔力值:</span>
          <span className="info-value">317.79</span>
        </div>
        <div className="info-row">
          <span className="info-label">邀请名额:</span>
          <span className="info-value">0个</span>
        </div>
        <div className="info-row">
          <span className="info-label">注册时间:</span>
          <span className="info-value">2023-03-03</span>
        </div>
        <div className="info-row">
          <span className="info-label">会员等级:</span>
          <span className="info-value">Nexus Master</span>
        </div>
      </div>
    </div>
  </div>

        <div className="main-content-wrapper">
          

          {/* 新签到组件 */}
          <div className="checkin-container">
            {showCheckinSuccess && (
              <div className="checkin-success">
                <h3>签到成功</h3>
                <p>这是您的第 {totalCheckins} 次签到，已连续签到 {consecutiveDays} 天。</p>
                <p>本次签到获得 10 个魔力值。</p>
                {makeupCards > 0 && <p>点击白色背景的圆点进行补签。你目前拥有补签卡 {makeupCards} 张。</p>}
                <p>今日签到排名：1807 / 1817</p>
              </div>
            )}
            
            <div className="compact-calendar">
              <div className="calendar-header">
                <h4>2025年5月</h4>
              </div>
              
              <div className="calendar-weekdays">
                {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              
              {calendarData.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="calendar-week">
                  {week.map((day, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className={`calendar-day ${
                        day === today ? 'today' : ''
                      } ${
                        checkedDays.includes(day) ? 'checked' : 'unchecked'
                      }`}
                      onClick={() => 
                        checkedDays.includes(day) ? null : 
                        day === today ? handleCheckIn(day) : 
                        handleMakeupCheckIn(day)
                      }
                    >
                      {day}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="checkin-rules">
              <ul>
                <li>首次签到获得 10 个魔力值</li>
                <li>连续签到额外奖励：
                  <ul>
                    <li>10天：500魔力值</li>
                    <li>20天：1000魔力值</li>
                    <li>30天：1000魔力值</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;