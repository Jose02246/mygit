import React, { useEffect, useState } from 'react';
import './SeedPage.css';
import axios from 'axios';

const SeedPage = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // 获取种子种类
    axios.get('/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('获取种类失败', error));

    // 获取标签
    axios.get('/api/tags')
      .then(response => setTags(response.data))
      .catch(error => console.error('获取标签失败', error));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedCategory || !selectedTag || !file) {
      alert('请选择类型、标签，并选择文件');
      return;
    }

    const formData = new FormData();
    formData.append('category', selectedCategory);
    formData.append('tag', selectedTag);
    formData.append('file', file);

    axios.post('/api/upload', formData)
      .then(response => alert('上传成功！'))
      .catch(error => alert('上传失败: ' + error.message));
  };

  return (
    <div className="seed-container">
      <h2>种子管理中心</h2>

      <div className="form-group">
        <label>选择种子类型：</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">-- 请选择类型 --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>选择标签：</label>
        <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
          <option value="">-- 请选择标签 --</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>选择种子文件：</label>
        <input type="file" onChange={handleFileChange} />
      </div>

      <div className="form-actions">
        <button className="upload-btn" onClick={handleUpload}>上传种子</button>
      </div>
    </div>
  );
};

export default SeedPage;
