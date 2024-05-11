import React, { createContext, useContext } from "react";
import LoginRequest from "../models/dto/LoginRequestDTO";
import RegisterRequest from "../models/dto/RegisterRequestDTO";
import Auth from "../models/Auth";

interface AuthContextData {
  authData?: Auth;
  setAuthData: React.Dispatch<React.SetStateAction<Auth | undefined>>;
  signIn: (credentials: LoginRequest) => Promise<void>;
  signUp: (credentials: RegisterRequest) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser utilizado dentro de um AuthProvider");
  }
  return context;
}
