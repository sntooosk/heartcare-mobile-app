import axios from "axios";
import { API } from "../..";
import Pressure from "../../../models/Pressure";
import CreatePressureDTO from "../../../models/dto/CreatePressureDTO";

export async function create(id: number, token: string, pressure: CreatePressureDTO) {
  const authToken = `Bearer ${token}`;

  try {
    const response = await axios.post(`${API}/pressure/`, pressure, {
      headers: {
        Authorization: authToken
      }
    });

    const { data } = response;
    return data;
  } catch (error) {
    console.error("Erro ao criar pressão:", error);
    throw error; // Reenvia o erro para ser tratado no componente que chama essa função
  }
}
