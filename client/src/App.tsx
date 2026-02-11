// import PostCard from './components/PostCard'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppPage from "./pages/AppPage";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/profile/Dashboard";
import Login from "./pages/auth/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
