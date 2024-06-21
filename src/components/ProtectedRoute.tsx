import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    element: React.ReactNode;
    requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated || (requiredRole && role !== requiredRole)) {
        return <Navigate to="/" />;
    }

    return element;

};

export default ProtectedRoute;