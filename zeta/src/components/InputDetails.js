export default function InputDetails({ placeholder, children }) {
  return (
    <input type="text" className="auth-input" placeholder={placeholder}>
      {children}
    </input>
  );
}
