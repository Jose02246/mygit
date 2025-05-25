import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';
import api from './api';

const UserProfile = () => {
    // 用户数据状态
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // 新增加载状态
  const [error, setError] = useState(null);     
  const baseURL = 'http://192.168.96.86:8081/api';  // 新增错误状态


  const [activeMenuItem, setActiveMenuItem] = useState('personal'); // 新增状态跟踪激活菜单项
  
  // 签到相关状态
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [checkinMessage, setCheckinMessage] = useState('');
  const [totalCheckins, setTotalCheckins] = useState(0); // 总签到次数
  const [consecutiveDays, setConsecutiveDays] = useState(0); // 连续签到天数
  const [lastCheckinDate, setLastCheckinDate] = useState(null); // 上次签到日期

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

// 签到处理函数
  const handleCheckIn = () => {
    if (hasCheckedIn) return;
    
    const today = new Date();
    const todayStr = today.toDateString();
    
    // 计算连续签到
    let newConsecutiveDays = 1;
    if (lastCheckinDate) {
      const yesterday = new Date(lastCheckinDate);
      yesterday.setDate(yesterday.getDate() + 1);
      
      if (yesterday.toDateString() === todayStr) {
        newConsecutiveDays = consecutiveDays + 1;
      }
    }

    // 更新状态
    setHasCheckedIn(true);
    setLastCheckinDate(todayStr);
    setTotalCheckins(totalCheckins + 1);
    setConsecutiveDays(newConsecutiveDays);
    
    // 计算奖励
    let bonus = 10;
    if (newConsecutiveDays % 10 === 0) {
      bonus += newConsecutiveDays === 10 ? 500 : 1000;
    }
    
    // 更新魔力值
    setUserData({
      ...userData,
      score: (parseFloat(userData.score) + bonus).toFixed(2)
    });
    
    // 设置签到消息
    setCheckinMessage(`
      签到成功！
      这是您的第 ${totalCheckins + 1} 次签到，
      已连续签到 ${newConsecutiveDays} 天。
      本次签到获得 ${bonus} 个魔力值
    `);
    
    // 3秒后清除消息
    setTimeout(() => setCheckinMessage(''), 3000);
  };

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


  return (
    <div className="user-profile-container">

<div className="main-content">
  <div className="content-header">
    <h2>个人中心</h2>
 <div className="header-actions">
            <button className="refresh-btn" onClick={() => window.location.reload()}>
              <i className="fas fa-sync-alt"></i> 刷新
            </button>
            <button 
              className={`checkin-btn ${hasCheckedIn ? 'checked' : ''}`}
              onClick={handleCheckIn}
              disabled={hasCheckedIn}
            >
              <i className="fas fa-calendar-check"></i> 
              {hasCheckedIn ? '已签到' : '每日签到'}
            </button>
          </div>
        </div>

        {checkinMessage && (
          <div className="checkin-message">
            {checkinMessage.split('\n').map((line, i) => (
              <p key={i}>{line.trim()}</p>
            ))}
          </div>
        )}

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
          <span className="info-value">{userData.email || '0987432@qq.com'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">称号:</span>
          <span className="info-value">{userData.customTitle || '测试用户'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">签名:</span>
          <span className="info-value">{userData.signature || '这个用户很懒，还没有个性签名'}</span>
        </div>
      </div>
    </div>

    {/* 流量统计卡片 */}
    <div className="dashboard-card">
      <h3><i className="fas fa-chart-line"></i> 流量统计</h3>
      <div className="card-content">
        <div className="info-row">
          <span className="info-label">做种时间:</span>
          <span className="info-value">{formatSecondsToHours(userData.seedingTime) || '103天 10小时'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">上传量:</span>
          <span className="info-value">{formatBytes(userData.uploaded) ||'0 B'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">下载量:</span>
          <span className="info-value">{formatBytes(userData.downloaded) || '26.67 MB'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">分享率:</span>
          <span className="info-value">0.00</span>
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
          <span className="info-value">{formatUnixTimeToDays(userData.createdAt) || '2023-03-03'}</span>
        </div>
      </div>
    </div>
  </div>

        <div className="main-content-wrapper">
        
        </div>
      </div>
    </div>
  );
};

export default UserProfile;