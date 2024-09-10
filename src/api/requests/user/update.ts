import axios from "axios";
import { API } from "../..";
import UpdateUserDTO from "../../../models/dto/UpdateUserDTO";

export async function updateUser(
  id: number,
  token: string,
  updateUser: UpdateUserDTO
) {
  try {
    const { data } = await axios.put(`${API}/api/v1/users/${id}`, updateUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
}
