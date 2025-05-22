import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 简单验证
    if (!formData.username || !formData.email || !formData.password) {
      setError('所有字段都是必填的');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (formData.password.length < 6) {
      setError('密码至少需要6个字符');
      return;
    }

    // 这里应该是实际的注册API调用
    console.log('注册信息:', formData);
    
    // 模拟注册成功
    alert('注册成功！请登录');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2>创建新账号</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">用户名</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="输入用户名"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">电子邮箱</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="输入邮箱地址"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">密码</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="至少6个字符"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">确认密码</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="再次输入密码"
          />
        </div>
        
        <button type="submit" className="register-btn">注册</button>
      </form>
      
      <div className="login-link">
        已有账号？<Link to="/login">立即登录</Link>
      </div>
    </div>
  );
};

export default RegisterPage;