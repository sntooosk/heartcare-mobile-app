import axios from "axios";
import ChangePassword from "../../../models/dto/ChangePasswordDTO";
import { API } from "../..";

export async function changePassword(email: string, changePassword: ChangePassword) {
  try {
    const response = await axios.post(
      `${API}/forgotPassword/changePassword/${email}`, changePassword);
      
    response.data;
  } catch (error) {
    console.error("Erro ao criar pressão:", error);
    throw new Error("Erro ao criar pressão. Por favor, tente novamente.");
  }
}
