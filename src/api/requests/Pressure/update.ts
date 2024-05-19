import axios from "axios";
import { API } from "../..";
import UpdatePressureDTO from "../../../models/dto/UpdatePressureDTO";

export async function update(idPressure: number, token: string, pressure: UpdatePressureDTO) {
  try {
    const { data } = await axios.put(`${API}/pressure/${idPressure}`, pressure, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    console.error("Erro ao atualizar pressão:", error);
    throw error;
  }
}
