import React, { useEffect, useState } from 'react';
import api from './api';  // 确认路径正确
import './SalePage.css';

function SalePage() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get('/v1/item/list')
      .then(res => {
        const sortedItems = res.data.sort((a, b) => a.displayOrder - b.displayOrder);
        setItems(sortedItems);
      })
      .catch(err => {
        console.error('获取商品失败:', err);
        setError('加载商品失败，请稍后重试。');
        setItems([]);
      });
  }, []);

  const handleExchange = async () => {
    setMessage(null);
    try {
      await api.post('/invite-code/generate');
      setMessage('兑换成功！邀请码已生成。');
    } catch (err) {
      console.error('兑换失败:', err);
      setMessage('兑换失败，请稍后重试。');
    }
  };

  return (
    <div className="sale-container">
      <h2 className="sale-title">🎁 积分商城</h2>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}

      {items === null ? (
        <p style={{ textAlign: 'center' }}>商品加载中...</p>
      ) : items.length === 0 ? (
        <p style={{ textAlign: 'center' }}>暂无商品</p>
      ) : (
        <div className="item-grid">
          {items.map((item) => (
            <div className="item-card" key={item.id || item.name}>
              <h3 className="item-name">{item.name}</h3>
              <p className="item-desc">{item.description}</p>
              <p className="item-price">积分：<strong>{item.price}</strong></p>
              <button 
                className="exchange-btn"  
                onClick={handleExchange}
              >
                兑换
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SalePage;
