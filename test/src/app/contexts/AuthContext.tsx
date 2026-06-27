import { createContext, ReactNode, useContext, useState } from "react";
import {
  login as loginRequest,
  register as registerRequest,
  type AuthResponse,
  type LoginPayload,
  type RegisterPayload,
} from "../services/authApi";

interface AuthContextType {
  token: string | null;
  user: AuthResponse["user"] | null;
  register: (payload: RegisterPayload) => Promise<AuthResponse>;
  login: (payload: LoginPayload) => Promise<AuthResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);

  const applyAuth = (response: AuthResponse) => {
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const register = async (payload: RegisterPayload) => applyAuth(await registerRequest(payload));
  const login = async (payload: LoginPayload) => applyAuth(await loginRequest(payload));
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
