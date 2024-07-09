import axios from "axios";

export async function verifyOtp(otp : number, email: String) {
  try {
    const response = await axios.post(`https://heartcare-backend.onrender.com/forgotPassword/verifyOtp/${otp}/${email}`,);
    return response.data;
  } catch (error) {
    console.error("Erro durante o envio do opt:", error);
    throw new Error("Erro ao realizar login. Por favor, tente novamente.");
  }
}
