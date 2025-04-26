import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  username?: string;
  dateOfBirth?: string;
  gender?: string;
  password?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, username: string, dateOfBirth: string, gender: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check for existing auth token on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Admin login
      if (email === "admin" && password === "admin") {
        const adminUser = { email: "admin", username: "admin", isAdmin: true };
        localStorage.setItem("user", JSON.stringify(adminUser));
        setUser(adminUser);
        setIsAuthenticated(true);
        navigate("/admin");
        return;
      }
      // Patient login
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const found = users.find((u: User) => u.email === email && u.password === password);
      if (found) {
        localStorage.setItem("user", JSON.stringify(found));
        setUser(found);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const register = async (email: string, password: string, username: string, dateOfBirth: string, gender: string) => {
    try {
      const userData: User = { email, username, dateOfBirth, gender, password, isAdmin: false };
      // Add to users array in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      navigate("/onboarding");
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 