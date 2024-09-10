import axios from "axios";
import { API } from "../..";

export async function getMedicationsByUser(idUser: number, token: string) {
  try {
    const response = await axios.get(`${API}/api/v1/medication/user/${idUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao obter medicamentos:", error);
    throw new Error("Erro ao obter medicamentos. Por favor, tente novamente.");
  }
}
