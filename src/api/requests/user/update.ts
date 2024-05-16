import axios from "axios";
import { API } from "../..";
import User from "../../../models/User";

export async function update(id: number, user: User) {
  const response = await axios.post(`${API}/users/${id}`, user);
  const { data } = response;
  console.log(data);
  return data;
}
