import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-author">By {post.author}</p>
      </div>
      
      <div className="post-image-container">
        <img src={post.imageUrl} alt={post.title} className="post-image" />
      </div>
      
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      
      <div className="post-footer">
        <span className="post-date">{post.date}</span>
        <div className="post-metrics">
          <span className="post-views">
            <i className="fa fa-eye"></i> {post.views}
          </span>
          <span className="post-likes">
            <i className="fa fa-heart"></i> {post.likes}
          </span>
          <span className="post-comments">
            <i className="fa fa-comment"></i> {post.comments}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;