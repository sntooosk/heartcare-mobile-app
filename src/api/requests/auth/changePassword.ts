import axios from "axios";
import ChangePassword from "../../../models/dto/ChangePasswordDTO";

export async function changePassword(email: string, changePassword: ChangePassword) {
  try {
    const response = await axios.post(
      `https://heartcare-backend.onrender.com/forgotPassword/changePassword/${email}`, changePassword);
      
    response.data;
  } catch (error) {
    console.error("Erro ao criar pressão:", error);
    throw new Error("Erro ao criar pressão. Por favor, tente novamente.");
  }
}
