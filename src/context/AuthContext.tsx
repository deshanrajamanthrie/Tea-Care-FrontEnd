import React, { createContext, useContext, useState } from "react";
import { authService } from "../service/authService";
import { useAsyncOperation } from "../hooks/useApi";
import type {
  LoginRequest,
  RegisterRequest,
  User,
} from "../util/apiNecessaryInterface";
import type { ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode | any;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  //const [user, setUser] = useState<User | null>(null);
  const { loading, error, execute, clearError } = useAsyncOperation();
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    const result = await execute(() => authService.login(credentials), {
      onSuccess: (authResponse: any) => {
        setUser(authResponse.user);
      },
    });
    return !!result;
  };

  const register = async (userData: RegisterRequest): Promise<boolean> => {
    const result = await execute(() => authService.register(userData), {
      onSuccess: (authResponse: any) => {
        setUser(authResponse.user);
      },
    });
    return !!result;
  };

  const logout = async () => {
    await execute(() => authService.logout(), {
      onSuccess: () => {
        setUser(null);
      },
    });
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;

    await execute(() => authService.updateProfile(userData), {
      onSuccess: (updatedUser) => {
        setUser(updatedUser);
      },
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
  };

  // return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  return (
    <AuthContext.Provider value={value}>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="loader border-4 border-t-4 border-gray-200 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};
