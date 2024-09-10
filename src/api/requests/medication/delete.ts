import axios from "axios";
import { API } from "../..";

export async function deleteMedication(id: number, token: string) {
  try {
    const response = await axios.delete(`${API}/api/v1/medication/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar medicamento:", error);
    throw new Error("Erro ao deletar medicamento. Por favor, tente novamente.");
  }
}
