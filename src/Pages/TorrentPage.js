import React, { useState, useEffect } from 'react';
import './TorrentPage.css';
import api from './api';

const TorrentPage = () => {
  const [torrents, setTorrents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);


  // 页面加载时拉取所有种子和分类
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // 拉取第一页全部种子（无筛选）
        const response = await fetch('http://192.168.96.86:8081/api/torrent/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: 1 }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTorrents(data.torrents || []);
      } catch (error) {
        console.error('获取种子数据失败:', error);
        setTorrents([]);
      } finally {
        setLoading(false);
      }
    };

    // 拉取分类列表
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category/list');
        setCategories(response.data);
      } catch (error) {
        console.error('获取种类失败', error);
      }
    };

    fetchInitialData();
    fetchCategories();
  }, []);

  // 点击搜索按钮时调用，根据搜索词和类别筛选
  const handleSearch = async () => {
    setLoading(true);
    try {
      const body = {
        page: 1,
      };

      if (searchTerm.trim() !== '') {
        body.keyword = searchTerm.trim();
      }

      if (selectedCategory.length > 0) {
  body.category = selectedCategory;  // 传数组
}

console.log('发送给后端的请求体:', JSON.stringify(body, null, 2));


      const response = await fetch('http://192.168.96.86:8081/api/torrent/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTorrents(data.torrents || []);
    } catch (error) {
      console.error('获取种子数据失败:', error);
      setTorrents([]);
    } finally {
      setLoading(false);
    }
  };

  // 在组件内，添加下载函数
const handleDownload = async (infoHash, title) => {
  try {
    const response = await api.get(`/torrent/download/${infoHash}`, {
      responseType: 'blob', // 重要：告诉 axios 以二进制流形式接收
    });

    // 用 Blob 创建下载链接
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `${title}.torrent`;
    document.body.appendChild(link);
    link.click();

    // 释放内存
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('下载失败:', error);
    alert('下载失败，请确认是否已登录或权限不足');
  }
};



  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  const formatDate = (timestamp) => new Date(timestamp).toLocaleString();

  return (
    <div className="torrent-container">
      <div className="torrent-header">
        <h2>种子搜索</h2>
        <div className="search-box" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="text"
            placeholder="搜索种子..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: '1' }}
          />
         <select
  multiple
  value={selectedCategory}
  onChange={(e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setSelectedCategory(selectedOptions);
  }}
  style={{ minWidth: '120px' }}
>

            <option value="">全部类型</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <button className="search-btn" onClick={handleSearch}>搜索</button>
        </div>
      </div>

      {loading ? (
        <div className="loading">加载中...</div>
      ) : (
        <div className="torrent-list">
          {torrents.length > 0 ? (
            torrents.map((torrent) => (
              <div key={torrent.id} className="torrent-item">
                <div className="torrent-info">
                  <h3>{torrent.title}</h3>
                  <p className="subtitle">{torrent.subTitle}</p>
                  <div className="torrent-meta">
                    <span className="size">{formatSize(torrent.size)}</span>
                    <span className="date">{formatDate(torrent.createdAt)}</span>
                    <span className="promo">{torrent.promotionPolicy.displayName}</span>
                  </div>
                  <div className="torrent-tags">
                    {(torrent.tags || []).map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="torrent-actions">
                   <button
        className="download-btn"
        onClick={() => handleDownload(torrent.infoHash, torrent.title)}
      >
        下载
      </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">没有找到匹配的种子</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TorrentPage;
