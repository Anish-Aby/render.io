import CallToActionButton from "./CallToActionButton";

export default function UserProfileOtherPostsCard() {
  return (
    <div className="user-other-post-card-main-container">
      <div className="user-other-post-image"></div>
      <div className="user-other-post-title">
        Space exploration is coming to a shocking halt?
      </div>
      <div className="user-other-post-stats">
        <div className="user-other-post-likes-and-comments-container">
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
        </div>
        <div className="user-other-post-save-button-container">
          <CallToActionButton>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="save-icon"
              viewBox="0 0 256 256"
            >
              <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path>
            </svg>
          </CallToActionButton>
        </div>
      </div>
      <div className="user-other-post-summary-container">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
  );
}
