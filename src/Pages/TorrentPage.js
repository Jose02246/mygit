import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TorrentPage.css';

const TorrentPage = () => {
  const [torrents, setTorrents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 模拟API请求
    const fetchTorrents = async () => {
      try {
        // 这里应该是实际的API请求，我们使用模拟数据
        const mockData = {
          totalElements: 2,
          totalPages: 1,
          torrents: [
            {
              id: 2,
              slug: "music",
              name: "music",
              title: "欣田",
              subTitle: "无",
              size: 26737916,
              createdAt: 1747276349080,
              tags: ["flac", "hot"],
              promotionPolicy: {
                displayName: "2倍",
                uploadRatio: 1.0,
                downloadRatio: 1.0
              }
            },
            {
              id: 5,
              slug: "music",
              name: "music",
              title: "晴天",
              subTitle: "无",
              size: 31511626,
              createdAt: 1747299270808,
              tags: ["flac"],
              promotionPolicy: {
                displayName: "2倍",
                uploadRatio: 1.0,
                downloadRatio: 1.0
              }
            }
          ]
        };
        setTorrents(mockData.torrents);
        setLoading(false);
      } catch (error) {
        console.error('获取种子数据失败:', error);
        setLoading(false);
      }
    };

    fetchTorrents();
  }, []);

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredTorrents = torrents.filter(torrent =>
    torrent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    torrent.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="torrent-container">
      <div className="torrent-header">
        <h2>种子搜索</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="搜索种子..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">搜索</button>
        </div>
      </div>

      {loading ? (
        <div className="loading">加载中...</div>
      ) : (
        <div className="torrent-list">
          {filteredTorrents.length > 0 ? (
            filteredTorrents.map(torrent => (
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
                    {torrent.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="torrent-actions">
                  <button className="download-btn">下载</button>
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