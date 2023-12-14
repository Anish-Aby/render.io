export default function NewsContainer({ isSticky = false, children }) {
  const addSticky = isSticky ? "make-sticky" : "";
  return (
    <div className={`updates-main-container ${addSticky}`}>
      <div className="updates-content-container">
        <div className="updates-title-container"> {children}</div>
      </div>
    </div>
  );
}
