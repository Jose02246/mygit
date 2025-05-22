import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForumPage.css';

const ForumPage = () => {
  const [activeTab, setActiveTab] = useState('forums');
  const [forums, setForums] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // 模拟数据加载
  useEffect(() => {
    setIsLoading(true);
    // 模拟API请求
    setTimeout(() => {
      setForums([
        { id: 1, name: '综合讨论', description: '关于网站的一般性讨论', postCount: 125, lastPost: '2025-05-18' },
        { id: 2, name: '资源分享', description: '分享各种资源信息', postCount: 89, lastPost: '2025-05-17' },
        { id: 3, name: '技术交流', description: '技术问题讨论与解答', postCount: 64, lastPost: '2025-05-16' },
        { id: 4, name: '意见建议', description: '对网站的建议和反馈', postCount: 42, lastPost: '2025-05-15' },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  // 加载帖子
  const loadPosts = (forumId) => {
    setIsLoading(true);
    setSelectedForum(forums.find(f => f.id === forumId));
    // 模拟API请求
    setTimeout(() => {
      setPosts([
        { 
          id: 1, 
          title: '网站新版上线啦！', 
          author: '管理员', 
          date: '2025-05-18', 
          views: 256, 
          replies: 24,
          content: '我们很高兴地宣布网站新版正式上线！新版本带来了许多改进和新功能。',
          comments: [
            { 
              id: 1, 
              author: '用户A', 
              date: '2025-05-18', 
              content: '太棒了！界面比以前好看多了！',
              replies: [
                { id: 11, author: '用户B', date: '2025-05-18', content: '我也觉得，特别是个人资料页面' },
                { id: 12, author: '用户C', date: '2025-05-18', content: '响应速度也快了不少' }
              ]
            },
            { 
              id: 2, 
              author: '用户D', 
              date: '2025-05-18', 
              content: '发现一个小bug，在个人资料页面...',
              replies: []
            },
          ]
        },
        { 
          id: 2, 
          title: '分享一个超好用的工具', 
          author: '热心网友', 
          date: '2025-05-17', 
          views: 189, 
          replies: 15,
          content: '我发现了一个非常实用的工具，可以大大提高工作效率...',
          comments: []
        },
      ]);
      setActiveTab('posts');
      setIsLoading(false);
    }, 500);
  };

  // 查看帖子详情
  const viewPost = (postId) => {
    setSelectedPost(posts.find(p => p.id === postId));
    setActiveTab('postDetail');
    setReplyingTo(null);
  };

  // 提交新帖子
  const submitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    
    const newPost = {
      id: posts.length + 1,
      title: newPostTitle,
      author: '当前用户',
      date: new Date().toLocaleDateString(),
      views: 0,
      replies: 0,
      content: newPostContent,
      comments: []
    };
    
    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setActiveTab('posts');
  };

 // 开始回复评论
  const startReply = (comment) => {
    setReplyingTo(comment);
    setNewCommentContent(`@${comment.author} `);
  };

  // 取消回复
  const cancelReply = () => {
    setReplyingTo(null);
    setNewCommentContent('');
  };


// 提交评论或回复
  const submitComment = () => {
    if (!newCommentContent.trim()) return;
    
    let updatedPost;
    if (replyingTo) {
      // 添加回复
      const reply = {
        id: Date.now(), // 使用时间戳作为临时ID
        author: '当前用户',
        date: new Date().toLocaleDateString(),
        content: newCommentContent
      };
      
      updatedPost = {
        ...selectedPost,
        comments: selectedPost.comments.map(comment => {
          if (comment.id === replyingTo.id) {
            return {
              ...comment,
              replies: [...comment.replies, reply]
            };
          }
          return comment;
        })
      };
    } else {
      // 添加新评论
      const newComment = {
        id: Date.now(), // 使用时间戳作为临时ID
        author: '当前用户',
        date: new Date().toLocaleDateString(),
        content: newCommentContent,
        replies: []
      };
      
      updatedPost = {
        ...selectedPost,
        comments: [...selectedPost.comments, newComment]
      };
    }
    
    setSelectedPost(updatedPost);
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    setNewCommentContent('');
    setReplyingTo(null);
  };

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h2>论坛</h2>
        <div className="forum-tabs">
          <button 
            className={activeTab === 'forums' ? 'active' : ''}
            onClick={() => setActiveTab('forums')}
          >
            板块列表
          </button>
          {selectedForum && (
            <button 
              className={activeTab === 'posts' ? 'active' : ''}
              onClick={() => setActiveTab('posts')}
            >
              {selectedForum.name}
            </button>
          )}
          {selectedPost && activeTab === 'postDetail' && (
            <button className="active">
              {selectedPost.title}
            </button>
          )}
          {selectedForum && (
            <button 
              className={activeTab === 'newPost' ? 'active' : ''}
              onClick={() => setActiveTab('newPost')}
            >
              发新帖
            </button>
          )}
        </div>
      </div>

      <div className="forum-content">
        {isLoading ? (
          <div className="loading">加载中...</div>
        ) : (
          <>
            {activeTab === 'forums' && (
              <div className="forum-list">
                {forums.map(forum => (
                  <div key={forum.id} className="forum-item" onClick={() => loadPosts(forum.id)}>
                    <div className="forum-info">
                      <h3>{forum.name}</h3>
                      <p>{forum.description}</p>
                    </div>
                    <div className="forum-stats">
                      <span>帖子: {forum.postCount}</span>
                      <span>最后更新: {forum.lastPost}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="post-list">
                <button 
                  className="new-post-btn"
                  onClick={() => setActiveTab('newPost')}
                >
                  发新帖
                </button>
                
                {posts.map(post => (
                  <div key={post.id} className="post-item" onClick={() => viewPost(post.id)}>
                    <div className="post-title">{post.title}</div>
                    <div className="post-meta">
                      <span>作者: {post.author}</span>
                      <span>日期: {post.date}</span>
                      <span>浏览: {post.views}</span>
                      <span>回复: {post.replies}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'postDetail' && selectedPost && (
              <div className="post-detail">
                <div className="post-header">
                  <h3>{selectedPost.title}</h3>
                  <div className="post-meta">
                    <span>作者: {selectedPost.author}</span>
                    <span>日期: {selectedPost.date}</span>
                    <span>浏览: {selectedPost.views}</span>
                    <span>回复: {selectedPost.replies}</span>
                  </div>
                </div>
                
                <div className="post-content">
                  {selectedPost.content}
                </div>
                
                <div className="comments-section">
                  <h4>评论 ({selectedPost.comments.length})</h4>
                  
                  {selectedPost.comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-meta">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-date">{comment.date}</span>
                        <button 
                    className="reply-btn"
                    onClick={() => startReply(comment)}
                  >
                    回复
                  </button>
                      </div>
                      <div className="comment-content">{comment.content}</div>
                       {/* 回复列表 */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="replies-list">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="reply-item">
                        <div className="reply-meta">
                          <span className="reply-author">{reply.author}</span>
                          <span className="reply-date">{reply.date}</span>
                        </div>
                        <div className="reply-content">{reply.content}</div>
                      </div>
                    ))}
                  </div>
                )}
                    </div>
                  ))}
                  
                  <div className="comment-form">
              {replyingTo && (
                <div className="replying-to">
                  正在回复 @{replyingTo.author}
                  <button onClick={cancelReply}>取消</button>
                </div>
              )}
              <textarea
                placeholder={replyingTo ? `回复 @${replyingTo.author}...` : "发表你的评论..."}
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
              />
              <button onClick={submitComment}>
                {replyingTo ? '回复' : '提交评论'}
              </button>
            </div>
          </div>
        </div>
      )}

            {activeTab === 'newPost' && (
              <div className="new-post-form">
                <h3>发表新帖</h3>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="标题"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="内容"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                </div>
                <div className="form-actions">
                  <button onClick={submitPost}>发表</button>
                  <button onClick={() => setActiveTab('posts')}>取消</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ForumPage;