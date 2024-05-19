import axios from "axios";
import { API } from "../..";
import Pressure from "../../../models/Pressure";
import UpdatePressureDTO from "../../../models/dto/UpdatePressureDTO";

export async function update(idPressure: number, token: string ,  pressure: UpdatePressureDTO) {
  const authToken = `Bearer ${token}`;

  try {
    const response = await axios.put(`${API}/pressure/${idPressure}`, pressure, {
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
