import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PointsShop.css';

const PointsShop = () => {
  const navigate = useNavigate();

  // 商品数据
  const products = [
    {
      id: 1,
      name: 'VIP会员7天',
      price: 500,
      image: '🎁',
      description: '享受7天VIP特权，下载加速',
      remaining: 15
    },
    {
      id: 2,
      name: '专属头像框',
      price: 300,
      image: '🖼️',
      description: '独特头像框，彰显尊贵身份',
      remaining: 8
    },
    {
      id: 3,
      name: '补签卡',
      price: 200,
      image: '📅',
      description: '补签错过的好日子',
      remaining: 20
    },
    {
      id: 4,
      name: '神秘礼包',
      price: 800,
      image: '🎁',
      description: '随机获得超值道具',
      remaining: 5
    }
  ];

  return (
    <div className="points-shop-container">
      <div className="shop-header">
        <h1>
          积分商城
          <span className="gift-icon">🎁</span>
        </h1>
        <div className="user-points">
          我的积分: <span className="points-value">1,578</span>
        </div>
      </div>

      <div className="decorative-banner">
        <div className="banner-text">限时特惠 · 每日更新</div>
        <div className="banner-stars">✨✨✨</div>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price} 积分</div>
            <div className="product-description">{product.description}</div>
            <div className="product-stock">剩余: {product.remaining}份</div>
            <button 
              className="buy-button"
              onClick={() => alert(`购买 ${product.name} 成功!`)}
            >
              立即兑换
            </button>
            {product.remaining < 10 && (
              <div className="hot-tag">热销</div>
            )}
          </div>
        ))}
      </div>

      <div className="shop-footer">
        <button className="back-button" onClick={() => navigate(-1)}>
          返回首页
        </button>
        <div className="footer-note">每日0点刷新商品 · 最终解释权归本站所有</div>
      </div>
    </div>
  );
};

export default PointsShop;