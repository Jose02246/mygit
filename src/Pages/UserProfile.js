<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  // 用户数据状态
  const [userData, setUserData] = useState({
    username: 'PT_User',
    uploaded: '41.832 TB',
    downloaded: '4.171 TB',
    ratio: '10.03',
    bonusPoints: '157862',
    seedingCount: 0,
    seedingSize: '0 KB',
    joinTime: '93周',
    userClass: 'Nexus Master',
    lastUpdate: '2025-05-16',
    piv: '0',
    activeDays: '0天',
    medals: '0枚',
    onlineHours: '0小时',
    avatar: 'https://via.placeholder.com/80'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(userData.username);
  const [tempAvatar, setTempAvatar] = useState(userData.avatar);
  
  // 签到相关状态
  const [checkedDays, setCheckedDays] = useState([1, 2, 3, 16]); // 示例已签到日期
  const [consecutiveDays, setConsecutiveDays] = useState(1); // 连续签到天数
  const [totalCheckins, setTotalCheckins] = useState(4); // 总签到次数
  const [makeupCards, setMakeupCards] = useState(1); // 补签卡数量
  const [showCheckinSuccess, setShowCheckinSuccess] = useState(false); // 是否显示签到成功提示
  
  const navigate = useNavigate();

  const handleSeedDownload = () => {
    navigate('/seed');
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
      
      // 更新魔力值（补签只给基础奖励）
      setUserData({
        ...userData,
        bonusPoints: (parseInt(userData.bonusPoints) + 10).toString()
      });
    }
  };
 // 日历数据 - 2025年5月
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
      {/* 侧边栏 */}
      <div className="sidebar">
        <div className="user-basic-info">
          <div className="avatar-container">
            <img src={isEditing ? tempAvatar : userData.avatar} alt="用户头像" className="user-avatar" />
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
          <button className="menu-item">种子</button>
          <button className="menu-item">发布</button>
          <button className="menu-item">积分商城</button>
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
          <button className="refresh-btn">F5 刷新</button>
        </div>

        <div className="main-content-wrapper">
          <div className="data-table">
            <div className="table-header">
              <div className="header-item">用户名</div>
              <div className="header-item">上传量</div>
              <div className="header-item">下载量</div>
              <div className="header-item">分享率</div>
              <div className="header-item">魔力值</div>
              <div className="header-item">做种数</div>
              <div className="header-item">做种体积</div>
              <div className="header-item">入站</div>
              <div className="header-item">当前等级</div>
              <div className="header-item">更新日期</div>
            </div>

            <div className="table-row">
              <div className="row-item">{userData.username}</div>
              <div className="row-item">{userData.uploaded}</div>
              <div className="row-item">{userData.downloaded}</div>
              <div className="row-item">{userData.ratio}</div>
              <div className="row-item">{userData.bonusPoints}</div>
              <div className="row-item">{userData.seedingCount}</div>
              <div className="row-item">{userData.seedingSize}</div>
              <div className="row-item">{userData.joinTime}</div>
              <div className="row-item">{userData.userClass}</div>
              <div className="row-item">{userData.lastUpdate}</div>
            </div>
          </div>

          <div className="user-actions">
            <button className="seed-download-btn" onClick={handleSeedDownload}>
              种子下载
            </button>
          </div>

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

=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  // 用户数据状态
  const [userData, setUserData] = useState({
    username: 'PT_User',
    uploaded: '41.832 TB',
    downloaded: '4.171 TB',
    ratio: '10.03',
    bonusPoints: '157862',
    seedingCount: 0,
    seedingSize: '0 KB',
    joinTime: '93周',
    userClass: 'Nexus Master',
    lastUpdate: '2019-09-19',
    piv: '83068',
    activeDays: '7天',
    medals: '46枚',
    onlineHours: '369小时',
    avatar: 'https://via.placeholder.com/80'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(userData.username);
  const [tempAvatar, setTempAvatar] = useState(userData.avatar);
  const navigate = useNavigate();

  const handleSeedDownload = () => {
    navigate('/seed');
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

  return (
    <div className="user-profile-container">
      {/* 侧边栏 */}
      <div className="sidebar">
        <div className="user-basic-info">
          <div className="avatar-container">
            <img src={isEditing ? tempAvatar : userData.avatar} alt="用户头像" className="user-avatar" />
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
          <button className="menu-item" onClick={() => navigate('/sale')}>浏览器</button>
          <button className="menu-item">交流区</button>
          <button className="menu-item">风云榜</button>
          <button className="menu-item active">个人数据</button>
          <button className="menu-item">聚合搜索</button>
          <button className="menu-item">数据统计</button>
          <button className="menu-item">影视瀑布</button>
          <button className="menu-item">关于我们</button>
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
          <button className="refresh-btn">F5 刷新</button>
        </div>

        <div className="data-table">
          <div className="table-header">
            <div className="header-item">用户名</div>
            <div className="header-item">上传量</div>
            <div className="header-item">下载量</div>
            <div className="header-item">分享率</div>
            <div className="header-item">魔力值</div>
            <div className="header-item">做种数</div>
            <div className="header-item">做种体积</div>
            <div className="header-item">入站</div>
            <div className="header-item">当前等级</div>
            <div className="header-item">更新日期</div>
          </div>

          <div className="table-row">
            <div className="row-item">{userData.username}</div>
            <div className="row-item">{userData.uploaded}</div>
            <div className="row-item">{userData.downloaded}</div>
            <div className="row-item">{userData.ratio}</div>
            <div className="row-item">{userData.bonusPoints}</div>
            <div className="row-item">{userData.seedingCount}</div>
            <div className="row-item">{userData.seedingSize}</div>
            <div className="row-item">{userData.joinTime}</div>
            <div className="row-item">{userData.userClass}</div>
            <div className="row-item">{userData.lastUpdate}</div>
          </div>
        </div>

        <div className="user-actions">
          <button className="seed-download-btn" onClick={handleSeedDownload}>
            种子下载
          </button>
        </div>
      </div>
    </div>
  );
};

>>>>>>> d515fb0 (第一次上传)
export default UserProfile;