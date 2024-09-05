import axios from "axios";
import { API } from "../..";

export async function verifyMail(email: String) {
  try {
    const response = await axios.post(`${API}/forgotPassword/verifyMail/${email}`,);
    return response.data;
  } catch (error) {
    console.error("Erro durante o envio do opt:", error);
    throw new Error("Erro ao realizar login. Por favor, tente novamente.");
  }
}
