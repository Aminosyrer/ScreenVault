import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextProps {
    isAuthenticated: boolean;
    role: string;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface DecodedToken {
    exp: number;
    ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: string;
}

const isTokenValid = (token: string): boolean => {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
            const decoded: DecodedToken = jwtDecode(token);
            setIsAuthenticated(true);
            setRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
        } else {
            localStorage.removeItem('token');
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        const decoded: DecodedToken = jwtDecode(token);
        setRole(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setRole('');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};