import axios from "axios";
import { API } from "../..";
import CreatePressureDTO from "../../../models/dto/CreatePressureDTO";

export async function create(id: number, token: string, pressure: CreatePressureDTO) {
  try {
    const { data } = await axios.post(
      `${API}/pressure/`,
      pressure,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  } catch (error) {
    console.error("Erro ao criar pressão:", error);
    throw error;
  }
}
