'use client';

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    userRole: string | null; 
    login: (token: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string | null>(null); 

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setIsAuthenticated(true);
            setUserRole(parsedUser.role); 
        }
    }, []);

    const login = (token: string, role: string) => {
        setIsAuthenticated(true);
        setUserRole(role);
        localStorage.setItem('user', JSON.stringify({ token, role })); 
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
