import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { signIn as signInApi } from "../api/requests/auth/SignIn";
import { signUp as signUpApi } from "../api/requests/auth/SignUp";
import {
  asyncGetUser,
  asyncRemoveUser,
  asyncSetUser,
} from "../utils/storage/AuthStorage";
import { useToast } from "../context/ToastContext";
import LoginRequest from "../models/dto/LoginRequestDTO";
import RegisterRequest from "../models/dto/RegisterRequestDTO";
import Auth from "../models/Auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<Auth | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = async () => {
    setIsLoading(true);
    try {
      const user = await asyncGetUser();
      if (user) {
        setAuthData(user);
        console.log(user);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do armazenamento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await signInApi(credentials);
      if ("message" in response) {
        showToast("error", response.message);
      } else {
        const user = response as Auth;
        setAuthData(user);
        await asyncSetUser(user);
      }
    } catch (error) {
      console.error("Erro ao entrar:", error);
      showToast("error", "Algo deu errado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await signUpApi(credentials);
      if ("message" in response) {
        showToast("error", response.message);
      } else {
        const user = response as Auth;
        setAuthData(user);
        await asyncSetUser(user);
      }
    } catch (error) {
      console.error("Erro ao se cadastrar:", error);
      showToast("error", "Algo deu errado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    showToast("info", "Você foi desconectado.");
    setAuthData(undefined);
    await asyncRemoveUser();
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        setAuthData,
        signIn,
        signUp,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
