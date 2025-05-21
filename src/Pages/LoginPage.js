import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { IconParkOutlineMail, IconParkOutlineUser, MaterialSymbolsKeyOutline, MingcuteInviteLine } from '../components/icons/IconParkOutline';

const LoginPage = () => {
  // 登录表单状态
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 注册表单状态
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  // 当前展示登录还是注册
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  // 登录处理函数
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.10.117:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data?.token?.tokenValue) {
        localStorage.setItem('token', data.token.tokenValue);
        localStorage.setItem('userId', data.token.loginId);
        alert('登录成功！');
        navigate('/user');
      } else {
        alert(data.message || '用户名或密码错误');
      }
    } catch (error) {
      console.error('登录请求失败:', error);
      alert('无法连接服务器，请检查网络或稍后重试');
    }
  };

  // 注册处理函数
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.10.117:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: regEmail,
          username: regUsername,
          password: regPassword,
          inviteCode: inviteCode,
        }),
      });

      const data = await response.json();

      if (data?.token?.tokenValue) {
        alert('注册成功！请登录');
        // 注册成功后切回登录界面
        setIsLogin(true);
        // 清空注册表单
        setRegEmail('');
        setRegUsername('');
        setRegPassword('');
        setInviteCode('');
      } else {
        alert(data.message || '注册失败');
      }
    } catch (error) {
      console.error('注册请求失败:', error);
      alert('无法连接服务器，请检查网络或稍后重试');
    }
  };

  return (
    <div className="login-page">
      <video autoPlay muted loop className="background-video">
        <source src="/out2.mp4" type="video/mp4" />
        您的浏览器不支持视频播放。
      </video>

      <div className="login-container">
        {isLogin ? (
          <>
            <h1>登录</h1>
            <form onSubmit={handleLogin}>
              <div className="form-group with-icon">
                <h2>用户名</h2>
                <div className="input-wrapper">
                  <IconParkOutlineUser className="input-icon" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="用户名"
                  />
                </div>
              </div>
              <div className="form-group with-icon">
                <h2>密码</h2>
                <div className="input-wrapper">
                  <MaterialSymbolsKeyOutline className="input-icon" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="密码"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="login-btn">
                  登录
                </button>
              </div>
            </form>

            <div className="links">
              <p>
                还没有账号？{' '}
                <a
                  href="#"
                  className="link-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(false);
                  }}
                >
                  马上注册！
                </a>
              </p>
              <p>
                <a href="/forgot-password">
                  忘记了密码？通过邮件来找回密码
                </a>
              </p>
              <p>
                <a href="/resend-verification">
                  没有收到验证邮件或验证链接无法打开？重新发送验证邮件
                </a>
              </p>
            </div>
          </>
        ) : (
          <>
            <h1>注册</h1>
            <form onSubmit={handleRegister}>
              <div className="form-group with-icon">
                <h2>邮箱</h2>
                <div className="input-wrapper">
                  <IconParkOutlineMail className="input-icon" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    placeholder="请输入邮箱"
                  />
                </div>
              </div>


              <div className="form-group with-icon">
                <h2>用户名</h2>
                <div className="input-wrapper">
                  <IconParkOutlineUser className="input-icon" />
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    required
                    placeholder="用户名"
                  />
                </div>
              </div>

              <div className="form-group with-icon">
                <h2>密码</h2>
                <div className="input-wrapper">
                  <MaterialSymbolsKeyOutline className="input-icon" />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    placeholder="密码"
                  />
                </div>
              </div>
              <div className="form-group with-icon">
                <h2>邀请码</h2>
                <div className="input-wrapper">
                  <MingcuteInviteLine className="input-icon" />
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    required
                    placeholder="邀请码"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="login-btn">
                  注册
                </button>
                <button
                  type="button"
                  className="link-button"
                  onClick={() => setIsLogin(true)}
                  style={{ marginLeft: '1rem' }}
                >
                  返回登录
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
