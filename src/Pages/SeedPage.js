<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from 'react';
import './SeedPage.css';
import api from './api';

const SeedPage = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [file, setFile] = useState(null);

  // 4个字段都用文本输入框，anonymous也改成字符串类型
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  //const [anonymous, setAnonymous] = useState(''); // 原来是布尔，这里改成文本输入

  useEffect(() => {
    api.get('/category/list')
      .then(response => setCategories(response.data))
      .catch(error => console.error('获取种类失败', error));

    api.get('/tag/list')
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
    if (!title.trim()) {
      alert('请输入标题');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('description', description);
    //formData.append('anonymous', anonymous.trim()); // 直接传字符串
    formData.append('category', String(selectedCategory));
    formData.append('tag', String(selectedTag));
    formData.append('file', file);

    api.post('/torrent/upload', formData)
      .then(() => alert('上传成功！'))
      .catch(error => alert('上传失败: ' + error.message));
  };

  return (
    <div className="seed-container">
      <h2>种子管理中心</h2>

      <div className="form-group">
        <label>标题：</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="请输入标题"
        />
      </div>

      <div className="form-group">
        <label>副标题：</label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="请输入副标题"
        />
      </div>

      <div className="form-group">
        <label>描述：</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="请输入描述"
        />
      </div>


      <div className="form-group">
        <label>选择种子类型：</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- 请选择类型 --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>选择标签：</label>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">-- 请选择标签 --</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.name}>{tag.name}</option>
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
>>>>>>> d515fb0 (第一次上传)
