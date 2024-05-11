import axios, { AxiosRequestConfig } from "axios";
import { API } from "../api";
import UserProfile from "../../models/UserProfile";

export async function getProfile(authorization: string): Promise<UserProfile> {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: authorization
    }
  };

  try {
    const response = await axios.get(`${API}/profile/get`, config);
    const { data } = response;
    return data;
  } catch (error) {
    console.error("Erro ao obter perfil:", error);
    throw error;
  }
}
