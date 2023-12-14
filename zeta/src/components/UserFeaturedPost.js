import CallToActionButton from "./CallToActionButton";

export default function UserFeaturedPost() {
  return (
    <div className="featured-post-main-container">
      <div className="featured-post-img-container"></div>
      <div className="featured-post-details-container">
        <div className="featured-post-title">
          Space exploration is coming to a shocking halt?
        </div>
        <div className="featured-post-action-buttons">
          <div className="featured-post-stat">
            <span className="featured-post-likes">
              <CallToActionButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="heart-icon"
                >
                  <path d="M240,98a57.63,57.63,0,0,1-17,41L133.7,229.62a8,8,0,0,1-11.4,0L33,139a58,58,0,0,1,82-82.1L128,69.05l13.09-12.19A58,58,0,0,1,240,98Z"></path>
                </svg>
                40
              </CallToActionButton>
            </span>
            <span className="featured-post-comments">
              <CallToActionButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="comments-icon"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"></path>
                </svg>
                15
              </CallToActionButton>
            </span>
            <span className="featured-post-date">31 November, 2023</span>
          </div>
        </div>
        <div className="featured-post-post-summary">
          Docker, a cornerstone of modern containerization technology, presents
          a unique challenge for system administrators and DevOps engineers who
          rely on efficiency and effective tools for managing complex container
          environments. While Docker's command-line interface (CLI) offers
          robust capabilities, navigating through multiple containers, images,
          and volumes can become cumbersome. Enter Lazydocker: a simple yet
          powerful
        </div>
      </div>
    </div>
  );
}
