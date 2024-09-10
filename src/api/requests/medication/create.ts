import axios from "axios";
import { API } from "../..";
import CreateMedicationDTO from "../../../models/dto/CreateMedicationDTO";

export async function createMedication(token: string, medication: CreateMedicationDTO) {
  try {
    const response = await axios.post(`${API}/api/v1/medication/`, medication, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar medicamento:", error);
    throw new Error("Erro ao criar medicamento. Por favor, tente novamente.");
  }
}
