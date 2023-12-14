export default function Button({ isActive = "", children }) {
  return (
    <div className="primary-button-container">
      <button className={`primary-button ${isActive}`}>{children}</button>
    </div>
  );
}
