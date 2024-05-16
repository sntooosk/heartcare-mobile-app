import axios from "axios";
import { API } from "../..";

export async function get(id: number) {
  const response = await axios.get(`${API}/users/${id}`);
  const { data } = response;
  console.log(data);
  return data;
}
