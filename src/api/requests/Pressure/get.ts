import axios from "axios";
import { API } from "../..";

export async function get(idUser: number, token: string) {
  const authToken = `Bearer ${token}`;

  try {
    const response = await axios.get(`${API}/pressure/?userId=${idUser}`, {
      headers: {
        Authorization: authToken
      }
    });

    const { data } = response;
    return data;
  } catch (error) {
    console.error("Erro ao obter usuário:", error);
    throw error; // Reenvia o erro para ser tratado no componente que chama essa função
  }
}


