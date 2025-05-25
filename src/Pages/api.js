import axios from 'axios';

// 创建 axios 实例
const api = axios.create({
  baseURL: 'http://192.168.96.86:8081/api', // 后端 API 地址
  timeout: 10000, // 可选：请求超时时间（毫秒）
});

// 请求拦截器 —— 每次请求自动携带 token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['sapling-token'] = token; // Sa-Token 默认读取这个字段
  }
  return config;
}, error => {
  console.error('请求拦截器出错:', error);
  return Promise.reject(error);
});

// 响应拦截器 —— 可选：统一处理响应错误
api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    // 可以在这里统一处理一些错误提示
    console.error(`响应错误: [${error.response.status}]`, error.response.data);
    if (error.response.status === 401) {
      alert('登录失效，请重新登录');
      // 例如可以清除token并跳转到登录页
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  } else {
    console.error('网络错误或服务器无响应:', error);
  }
  return Promise.reject(error);
});

export default api;
