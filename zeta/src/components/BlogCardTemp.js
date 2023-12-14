import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="blog-card-container-temp">
      <div className="blog-card-divider">
        <div className="blog-post-main-container">
          <div className="blog-card-details-container">
            <div className="blog-card-title-container">
              <Link to={"/@"}>
                <div className="blog-card-profile"></div>
              </Link>
              <div className="blog-card-author-date-container">
                <div className="blog-card-author">{blog.name}</div>
                <div className="blog-card-date">December 2nd, 2023</div>
              </div>
            </div>
            <Link className="react-blog-link" to={"/@Anish-Aby/space-explore"}>
              <div className="blog-card-title">{blog.title}</div>
            </Link>
            <Link className="react-blog-link" to={"/@Anish-Aby/space-explore"}>
              <div className="blog-card-summary">{blog.description}</div>
            </Link>
            <div className="blog-card-action-button-container">
              <button className="blog-card-action-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="heart-icon"
                >
                  <path d="M240,98a57.63,57.63,0,0,1-17,41L133.7,229.62a8,8,0,0,1-11.4,0L33,139a58,58,0,0,1,82-82.1L128,69.05l13.09-12.19A58,58,0,0,1,240,98Z"></path>
                </svg>
                {blog.likes}
              </button>
              <button className="blog-card-action-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="comments-icon"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"></path>
                </svg>
                {blog.comments}
              </button>
              <button className="blog-card-action-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="save-icon"
                  viewBox="0 0 256 256"
                >
                  <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path>
                </svg>
                Save
              </button>
              <div className="blog-card-action-category-container">
                <button className="blog-card-action-category">
                  {blog.category}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------------------ */}
        <div className="blog-card-image-container">
          <img src={blog.image} alt="blog" className="blog-card-image" />
        </div>
      </div>
    </div>
  );
}
