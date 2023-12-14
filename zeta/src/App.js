import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainTemp from "./MainTemp";
import Login from "./routes/Login";
import SignUp from "./routes/Signup";
import PasswordReset from "./routes/PasswordReset";
import UserProfile from "./routes/UserProfile";
import BlogPage from "./routes/BlogPage";
import WriteBlog from "./routes/WriteBlog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainTemp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/@" element={<UserProfile />} />
        <Route path="/@Anish-Aby/space-explore" element={<BlogPage />} />
        <Route path="/write" element={<WriteBlog />} />
      </Routes>
    </BrowserRouter>
  );
}
