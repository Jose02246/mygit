import React, { useState } from 'react';
import './SeedPage.css';

const SeedPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [remainingUploads, setRemainingUploads] = useState(5);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleScreenshotChange = (e) => {
    if (e.target.files[0]) {
      setScreenshot(e.target.files[0]);
      setRemainingUploads(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里处理表单提交逻辑
    console.log({ title, subtitle, description, selectedFile, screenshot });
    alert('种子提交成功！');
  };

  return (
    <div className="seed-container">
      <h2>发布种子</h2>
      
      <form onSubmit={handleSubmit}>
        {/* 种子文件上传 */}
        <div className="form-section">
          <div className="form-header">
            <h3>种子文件</h3>
            <div className="form-actions">
              <label className="file-upload-btn">
                选择文件
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
              </label>
              <span className="file-status">
                {selectedFile ? selectedFile.name : '未选择文件'}
              </span>
            </div>
          </div>
        </div>

        {/* 标题 */}
        <div className="form-section">
          <div className="form-header">
            <h3>标题</h3>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入规范标题"
            className="form-input"
          />
        </div>

        {/* 副标题 */}
        <div className="form-section">
          <div className="form-header">
            <h3>副标题</h3>
          </div>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="请输入副标题"
            className="form-input"
          />
        </div>

        {/* 简介编辑器 */}
        <div className="form-section">
          <div className="form-header">
            <h3>简介</h3>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
            placeholder="请输入详细描述..."
          />
        </div>

        {/* 截图上传 */}
        <div className="form-section">
          <div className="form-header">
            <h3>截图</h3>
            <div className="form-actions">
              <label className="file-upload-btn">
                选择文件
                <input 
                  type="file" 
                  onChange={handleScreenshotChange} 
                  accept="image/*"
                  style={{ display: 'none' }} 
                />
              </label>
              <span className="file-status">
                {screenshot ? screenshot.name : '未选择文件'}
              </span>
            </div>
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="form-footer">
          <button type="submit" className="submit-btn">发布种子</button>
        </div>
      </form>
    </div>
  );
};

export default SeedPage;