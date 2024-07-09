import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";

import LogoSvg from "../../assets/svg/logo.svg";
import { useTheme } from "../../context/ThemeContext";
import ResetPasswordForm from "../components/ResetPassword";
import ResetPasswordForm2 from "../components/ResetPassword2";
import ResetPasswordForm3 from "../components/ResetPassword3";
import { changePassword } from "../../api/requests/auth/changePassword";
import { verifyMail } from "../../api/requests/auth/verifyMail";
import { verifyOtp } from "../../api/requests/auth/verifyOtp";
import ChangePassword from "../../models/dto/ChangePasswordDTO";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/types";

function ResetPassword() {
  const { theme } = useTheme();

  const { navigate } = useNavigation<propsStack>();

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
      await verifyMail(resetEmail);
      setLoading(false);
      setShowResetPassword(false);
      setShowResetPassword2(true);
      alert("Código OTP enviado com sucesso");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  const handleEnvioCodigoOtp2 = async () => {
    try {
      await verifyMail(resetEmail);
      alert("Código OTP enviado com sucesso");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const handleVerificarCodigoOtp = async () => {
    try {
      setLoading(true);
      await verifyOtp(Number(codigoOtp), resetEmail); // Convertendo codigoOtp para número
      setLoading(false);
      setShowResetPassword2(false);
      setShowResetPassword3(true);
      alert("Código OTP verificado com sucesso");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  

  const handleMudarAsenha = async () => {
    const changePasswordData: ChangePassword = {
      password: mudarPassword,
      repeatPassword: mudarPasswordConf,
    };

    try {
      setLoading(true);
      await changePassword(resetEmail, changePasswordData);
      setLoading(false);
      setShowResetPassword2(false);
      setShowResetPassword3(true);
      alert("Senha alterada com sucesso");
      navigate("SignIn");
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
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
