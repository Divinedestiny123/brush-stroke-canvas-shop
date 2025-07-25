
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Create the authentication context
const AuthContext = createContext(undefined);

// Mock authentication for demo purposes
// In a real app, this would connect to a backend service
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("calligraphy-user");
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("calligraphy-user");
      }
    }
    
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("calligraphy-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("calligraphy-user");
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      // Mock login - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, accept any credentials with validation
      if (!email.includes('@') || password.length < 6) {
        throw new Error("Invalid credentials");
      }
      
      // Create a mock user (in a real app, this would come from the backend)
      setUser({
        id: Math.random().toString(36).substring(2),
        email,
        name: email.split('@')[0],
      });
      
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed: " + error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setIsLoading(true);
      // Mock registration - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validation
      if (!email.includes('@') || password.length < 6 || !name) {
        throw new Error("Invalid registration data");
      }
      
      // Create a mock user
      setUser({
        id: Math.random().toString(36).substring(2),
        email,
        name,
      });
      
      toast.success("Registration successful");
    } catch (error) {
      toast.error("Registration failed: " + error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
  };

  const updateProfile = (data) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, ...data } : null);
    toast.success("Profile updated successfully");
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
