import axios from "axios";
import { API } from "../..";

export async function getPost(token: string) {
  try {
    const response = await axios.get(`${API}/api/v1/posts/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados de pressão:", error);
    throw new Error(
      "Erro ao obter dados de pressão. Por favor, tente novamente."
    );
  }
}
