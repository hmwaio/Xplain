import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import PrivateRoute from './PrivateRoutes';
import Register from '../pages/auth/Register';
import NotFound from '../pages/NotFound';
import AppPage from '../pages/AppPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<AppPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        
        {/* Protected */}
        <Route element={<PrivateRoute />}>
          {/* <Route path="/create" element={<CreatePost />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Route>
        
        {/* Dynamic */}
        {/* <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/users/:id" element={<Profile />} /> */}
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}