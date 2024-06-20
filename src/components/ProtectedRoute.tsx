import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
    const isAuthenticated = Boolean(localStorage.getItem("token"));

    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;