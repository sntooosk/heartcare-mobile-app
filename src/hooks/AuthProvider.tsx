import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { signIn as signInApi } from "../api/requests/auth/signIn";
import { signUp as signUpApi } from "../api/requests/auth/signUp";
import {
  asyncGetUser,
  asyncRemoveUser,
  asyncSetUser,
} from "../utils/storage/AuthStorage";
import { Alert } from "react-native";
import LoginRequest from "../models/dto/LoginRequestDTO";
import RegisterRequest from "../models/dto/RegisterRequestDTO";
import Auth from "../models/Auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<Auth | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        Alert.alert("Erro ao entrar", response.message);
      } else {
        const user = response as Auth;
        setAuthData(user);
        await asyncSetUser(user);
      }
    } catch (error) {
      console.error("Erro ao entrar:", error);
      Alert.alert("Erro ao entrar", "Algo deu errado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: RegisterRequest) => {
    setIsLoading(true);
    try {
      const response = await signUpApi(credentials);
      if ("message" in response) {
        Alert.alert("Erro ao se cadastrar", response.message);
      } else {
        const user = response as Auth;
        setAuthData(user);
        await asyncSetUser(user);
      }
    } catch (error) {
      console.error("Erro ao se cadastrar:", error);
      Alert.alert("Erro ao se cadastrar", "Algo deu errado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    Alert.alert(
      "Confirmação",
      "Deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: async () => {
            setAuthData(undefined);
            await asyncRemoveUser();
          },
        },
      ],
      { cancelable: false }
    );
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
