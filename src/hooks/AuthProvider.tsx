import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { signIn as signInApi } from "../api/SignIn";
import { signUp as signUpApi } from "../api/SignUp";
import {
  asyncGetUser,
  asyncRemoveUser,
  asyncSetUser,
} from "../utils/storage/AuthStorage";
import { Alert } from "react-native";
import LoginRequest from "../models/dto/LoginRequestDTO";
import RegisterRequest from "../models/dto/RegisterRequestDTO";
import User from "../models/User";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<User | undefined>();
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
      const user = await signInApi(credentials);
      setAuthData(user);
      console.log(user);
      await asyncSetUser(user);
    } catch (error) {
      console.error("Erro ao entrar:", error);
      Alert.alert("Falha ao entrar");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (credentials: RegisterRequest) => {
    setIsLoading(true);
    try {
      await signUpApi(credentials);
      Alert.alert("Cadastro realizado com sucesso");
    } catch (error) {
      console.error("Erro ao se cadastrar:", error);
      Alert.alert("Falha ao se cadastrar");
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
