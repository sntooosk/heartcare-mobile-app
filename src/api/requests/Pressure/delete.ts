import axios from "axios";
import { API } from "../..";

export async function deletar(id: number, token: string) {
  try {
    const { data } = await axios.delete(`${API}/pressure/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    console.error("Erro ao deletar pressão:", error);
    throw error;
  }
}
