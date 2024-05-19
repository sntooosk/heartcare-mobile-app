import axios from "axios";
import { API } from "../..";

export async function get(idUser: number, token: string) {
  try {
    const { data } = await axios.get(`${API}/pressure/?userId=${idUser}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    console.error("Erro ao obter usuário:", error);
    throw error;
  }
}
