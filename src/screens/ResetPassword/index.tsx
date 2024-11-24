import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import LogoSvg from "../../assets/svg/logo.svg";
import ResetPasswordForm from "../components/ResetPassword";
import ResetPasswordForm2 from "../components/ResetPassword2";
import ResetPasswordForm3 from "../components/ResetPassword3";
import { changePassword } from "../../api/requests/auth/changePassword";
import { verifyMail } from "../../api/requests/auth/verifyMail";
import { verifyOtp } from "../../api/requests/auth/verifyOtp";
import ChangePassword from "../../models/dto/ChangePasswordDTO";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/types";
import { useToast } from "../../context/ToastContext";

function ResetPassword() {
  const { navigate } = useNavigation<propsStack>();
  const { showToast } = useToast();

  const [resetEmail, setResetEmail] = useState("");
  const [codigoOtp, setCodigoOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(true);
  const [showResetPassword2, setShowResetPassword2] = useState(false);
  const [showResetPassword3, setShowResetPassword3] = useState(false);
  const [mudarPassword, setMudarPassword] = useState("");
  const [mudarPasswordConf, setMudarPasswordConf] = useState("");

  const handleEnvioCodigoOtp = async () => {
    try {
      setLoading(true);
      const response = await verifyMail(resetEmail);
      if (response.status === "OK") {
        setShowResetPassword(false);
        setShowResetPassword2(true);
        showToast("success", "Código OTP enviado com sucesso!");
      } else {
        showToast("error", response.message || "Erro ao enviar código OTP.");
      }
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      showToast(
        "error",
        "Erro ao enviar código OTP. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEnvioCodigoOtp2 = async () => {
    try {
      setLoading(true);
      const response = await verifyMail(resetEmail);
      if (response.status === "OK") {
        setShowResetPassword(false);
        setShowResetPassword2(true);
        showToast("success", "Código OTP enviado com sucesso!");
      } else {
        showToast("error", response.message || "Erro ao enviar código OTP.");
      }
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      showToast(
        "error",
        "Erro ao enviar código OTP. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerificarCodigoOtp = async () => {
    try {
      setLoading(true);
      const response = await verifyOtp(Number(codigoOtp), resetEmail);
      if (response.status === "OK") {
        setShowResetPassword2(false);
        setShowResetPassword3(true);
        showToast("success", "Código OTP verificado com sucesso!");
      } else {
        showToast("error", response.message || "Erro ao verificar código OTP.");
      }
    } catch (error) {
      console.error("Erro ao verificar OTP:", error);
      showToast(
        "error",
        "Erro ao verificar código OTP. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMudarAsenha = async () => {
    if (mudarPassword !== mudarPasswordConf) {
      showToast("error", "As senhas não coincidem. Tente novamente.");
      return;
    }
  
    const changePasswordData = {
      password: mudarPassword,
      repeatPassword: mudarPasswordConf,
    };
  
    try {
      setLoading(true);
      await changePassword(resetEmail, changePasswordData);
      setShowResetPassword3(false);
      showToast("success", "Senha alterada com sucesso!");
      navigate("SignIn");
    } catch (error) {
      console.error("Erro ao mudar senha:", error);
      showToast("error", "Erro ao alterar senha. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={[styles.container, { backgroundColor: "#1F2937" }]}>
      <LogoSvg width={200} height={150} />

      {showResetPassword ? (
        <ResetPasswordForm
          resetEmail={resetEmail}
          setResetEmail={setResetEmail}
          handleEnvioCodigoOtp={handleEnvioCodigoOtp}
          loading={loading}
        />
      ) : showResetPassword2 ? (
        <ResetPasswordForm2
          codigoOtp={codigoOtp}
          setCodigoOtp={setCodigoOtp}
          handleVerificarCodigoOtp={handleVerificarCodigoOtp}
          handleEnvioCodigoOtp2={handleEnvioCodigoOtp2}
          loading={loading}
        />
      ) : showResetPassword3 ? (
        <ResetPasswordForm3
          Password={mudarPassword}
          setPassword={setMudarPassword}
          confPassword={mudarPasswordConf}
          setConfPassword={setMudarPasswordConf}
          handleMudarAsenha={handleMudarAsenha}
          loading={loading}
        />
      ) : null}
    </View>
  );
}

export default ResetPassword;
