import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState('');
  const [autoLogout, setAutoLogout] = useState('15');
  const [restrictIp, setRestrictIp] = useState(false);
  const [sslBrowser, setSslBrowser] = useState(true);
  const [sslTracker, setSslTracker] = useState(true);
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [language, setLanguage] = useState('zh-cn');

  const navigate = useNavigate();

  // 登录按钮点击事件，只打印信息，不跳转
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('登录提交', { username, password, twoFactor });
    // 不跳转
  };

  // 新按钮点击跳转
  const handleNewButtonClick = () => {
    navigate('/user'); // 跳转到 /user 页面
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setTwoFactor('');
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="login-container">
      <h2>登录 / 注册</h2>
      
      <div className="notice">
        <p>注意：你需要自用cookies才能登录或切换语言</p>
        <p>[10] 次连续登录失败将导致你的IP地址被禁用！</p>
        <p>你还有 [{attemptsLeft}] 次尝试机会</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">用户名：</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">密码：</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="twoFactor">两步验证：</label>
          <input
            type="text"
            id="twoFactor"
            value={twoFactor}
            onChange={(e) => setTwoFactor(e.target.value)}
            placeholder="如有设置必须填写"
          />
        </div>

        <div className="advanced-options">
          <h4>高级选项：</h4>
          
          <div className="form-group">
            <label htmlFor="autoLogout">自动登出：</label>
            <select
              id="autoLogout"
              value={autoLogout}
              onChange={(e) => setAutoLogout(e.target.value)}
            >
              <option value="15">15分钟后自动登出</option>
              <option value="30">30分钟后自动登出</option>
              <option value="60">1小时后自动登出</option>
              <option value="0">不自动登出</option>
            </select>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="restrictIp"
              checked={restrictIp}
              onChange={(e) => setRestrictIp(e.target.checked)}
            />
            <label htmlFor="restrictIp">限制IP：限制只能使用本IP登录</label>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="sslBrowser"
              checked={sslBrowser}
              onChange={(e) => setSslBrowser(e.target.checked)}
            />
            <label htmlFor="sslBrowser">SSL (HTTPS): 使用SSL数据加密协议浏览网站(浏览器)</label>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="sslTracker"
              checked={sslTracker}
              onChange={(e) => setSslTracker(e.target.checked)}
            />
            <label htmlFor="sslTracker">使用SSL数据加密协议连接Tracker(BT客户端)</label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="login-btn">登录</button>
          <button type="button" onClick={handleReset} className="reset-btn">重置</button>
          <button type="button" onClick={handleNewButtonClick} className="new-btn">跳转到 /seed</button>
        </div>
      </form>

      <div className="appeal-channel">
        <p>[申诉通道]</p>
      </div>

      <div className="links">
        <p>还没有账号？<a href="/register">马上注册！</a></p>
        <p><a href="/forgot-password">忘记了密码？通过邮件来找回密码</a></p>
        <p><a href="/ban-records">账号被禁用？通过封禁记录查看原因</a></p>
        <p><a href="/resend-verification">没有收到验证邮件或验证链接无法打开？重新发送验证邮件</a></p>
      </div>

      <div className="language-selector">
        <label htmlFor="language">Select Site Language: </label>
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="zh-cn">简体中文</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>
    </div>
  );
};

export default LoginPage;
