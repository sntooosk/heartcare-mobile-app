import axios from "axios";
import { API } from "../..";
import User from "../../../models/User";

export async function update(id: number, token: string, user: User) {
  try {
    const { data } = await axios.put(`${API}/users/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
}
