import axios from "axios";
import { API } from "../..";
import UpdatePressureDTO from "../../../models/dto/UpdatePressureDTO";

export async function update(
  idPressure: number,
  token: string,
  pressure: UpdatePressureDTO
) {
  try {
    const response = await axios.put(
      `${API}/pressure/${idPressure}`,
      pressure,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar pressão:", error);
    throw new Error("Erro ao atualizar pressão. Por favor, tente novamente.");
  }
}
