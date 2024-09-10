import axios from "axios";
import { API } from "../..";
import UpdateMedicationDTO from "../../../models/dto/UpdateMedicationDTO";

export async function updateMedication(
  idMedication: number,
  token: string,
  medication: UpdateMedicationDTO
) {
  try {
    const response = await axios.put(
      `${API}/api/v1/medication/${idMedication}`,
      medication,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar medicamento:", error);
    throw new Error("Erro ao atualizar medicamento. Por favor, tente novamente.");
  }
}
