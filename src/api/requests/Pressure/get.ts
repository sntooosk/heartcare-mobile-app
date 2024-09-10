import axios from "axios";
import { API } from "../..";

export async function getPressureByUser(idUser: number, token: string) {
  try {
    const response = await axios.get(`${API}/api/v1/pressure/user/${idUser}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
}
