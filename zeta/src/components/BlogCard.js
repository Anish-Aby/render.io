export default function BlogCard({ blog }) {
  return (
    <div className="blog-card-container">
      <div className="blog-card-details-container">
        <div className="blog-card-title-container">
          <div className="blog-card-profile"></div>
          <div className="blog-card-author-date-container">
            <div className="blog-card-author">{blog.name}</div>
            <div className="blog-card-date">December 2nd, 2023</div>
          </div>
        </div>
        <div className="blog-card-title">{blog.title}</div>
        <div className="blog-card-summary">{blog.description}</div>
        <div className="blog-card-action-button-container">
          <button className="blog-card-action-button">
            <img
              src="../../icons/heart-white.png"
              alt="comments"
              className="heart-icon"
            />
            {blog.likes}
          </button>
          <button className="blog-card-action-button">
            <img
              src="../../icons/chat-white.png"
              alt="comments"
              className="comments-icon"
            />
            {blog.comments}
          </button>
          <button className="blog-card-action-button">
            <img
              src="../../icons/save-white.png"
              alt="comments"
              className="comments-icon"
            />
            Save
          </button>
          <div className="blog-card-action-category-container">
            <button className="blog-card-action-category">
              {blog.category}
            </button>
          </div>
        </div>
      </div>
      <div className="blog-card-image-container">
        <img src={blog.image} alt="blog" className="blog-card-image" />
      </div>
    </div>
  );
}
