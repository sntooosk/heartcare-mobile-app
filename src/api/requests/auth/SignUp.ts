import axios from "axios";
import { API } from "../..";
import RegisterRequestDTO from "../../../models/dto/RegisterRequestDTO";

export async function signUp(credentials: RegisterRequestDTO) {
  try {
    const response = await axios.post(`${API}/api/v1/auth/register`, credentials);
    return response.data;
  } catch (error) {
    console.error("Erro durante o registro:", error);
    throw new Error("Erro ao realizar o registro. Por favor, tente novamente.");
  }
}
