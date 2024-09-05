import axios from "axios";
import { API } from "../..";
import CreatePressureDTO from "../../../models/dto/CreatePressureDTO";

export async function create(token: string, pressure: CreatePressureDTO) {
  try {
    const response = await axios.post(`${API}/api/v1/pressure/`, pressure, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pressão:", error);
    throw new Error("Erro ao criar pressão. Por favor, tente novamente.");
  }
}
