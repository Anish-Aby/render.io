import CallToActionButton from "./CallToActionButton";

export default function BlogContentCalltoActionDivider({ likes, comments }) {
  return (
    <div className="blog-content-call-to-action">
      <div className="blog-content-like-comment">
        <CallToActionButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="heart-icon"
          >
            <path d="M240,98a57.63,57.63,0,0,1-17,41L133.7,229.62a8,8,0,0,1-11.4,0L33,139a58,58,0,0,1,82-82.1L128,69.05l13.09-12.19A58,58,0,0,1,240,98Z"></path>
          </svg>
          {likes}
        </CallToActionButton>
        <CallToActionButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="comments-icon"
            viewBox="0 0 256 256"
          >
            <path d="M232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Z"></path>
          </svg>
          {comments}
        </CallToActionButton>
      </div>
      <div className="blog-content-save-share-option">
        <CallToActionButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="save-icon"
            viewBox="0 0 256 256"
          >
            <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Z"></path>
          </svg>
        </CallToActionButton>
        <CallToActionButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="share-icon"
            viewBox="0 0 256 256"
          >
            <path d="M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z"></path>
          </svg>
        </CallToActionButton>
        <CallToActionButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="options-icon"
          >
            <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
          </svg>
        </CallToActionButton>
      </div>
    </div>
  );
}
