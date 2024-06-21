import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './pages/MovieDetail';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { useColorMode } from "@chakra-ui/react";

const EnforceColorMode = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("light");
  }, [setColorMode]);

  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <EnforceColorMode />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;