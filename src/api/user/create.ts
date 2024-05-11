import axios, { AxiosRequestConfig } from "axios";
import UserProfile from "../../models/UserProfile";
import { API } from "../api";

export async function createProfile(credentials: UserProfile, authorization: string): Promise<void> {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: authorization
    }
  };

  try {
    await axios.post(`${API}profile/create`, credentials, config);
    console.log("Perfil criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
    throw error;
  }
}
