export default function CategoryButton({
  isActive = "",
  children,
  className = "",
}) {
  return (
    <div className={`category-button-container ${className}`}>
      <button className={`category-button ${isActive}`}>{children}</button>
    </div>
  );
}
