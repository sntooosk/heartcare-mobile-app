import axios from "axios";
import { API } from "../..";

export async function get(idUser: number, token: string) {
  try {
    const response = await axios.get(`${API}/pressure/user/${idUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
  }
}
