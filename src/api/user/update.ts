import axios, { AxiosRequestConfig } from "axios";
import UserProfile from "../../models/UserProfile";
import { API } from "../api";

export async function updateProfile(credentials: UserProfile, id: string, authorization: string): Promise<void> {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: authorization
    }
  };

  try {
    await axios.put(`${API}profile/update/${id}`, credentials, config);
    console.log("Perfil atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw error;
  }
}
