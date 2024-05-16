import axios from "axios";
import { API } from "../..";
import User from "../../../models/User";

export async function update(id: number, token: string ,  user: User) {
  const authToken = `Bearer ${token}`;

  try {
    const response = await axios.put(`${API}/users/${id}`, user, {
      headers: {
        Authorization: authToken
      }
    });

    const { data } = response;
    return data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error; // Reenvia o erro para ser tratado no componente que chama essa função
  }
}
