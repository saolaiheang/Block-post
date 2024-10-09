
import React from 'react';

const BlogCard = ({ title, author, date, desc, image }) => {
  return (
    <div className="blog-card">
      <img src={image} alt={title} className="blog-card-image" />
      <div className="blog-card-content">
        <h3>{title}</h3>
        <p>By {author}</p>
        <span className="category-tag">{desc}</span>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default BlogCard;
