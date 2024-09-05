import React, { useState } from "react";
import { View } from "react-native";
import SignUpForm from "../components/SignUpForm";
import { styles } from "./styles";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import LogoSvg from "../../assets/svg/logo.svg";

function SignUp() {
  const { signUp, isLoading } = useAuth();
  const { theme } = useTheme();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [confPassword, setConfPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignUp = async () => {
    if (password !== confPassword) {
      showToast("error", "As senhas não coincidem.");
      return;
    }

    try {
      await signUp({ name, email, password, role });
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: "#1F2937" }]}>
      <LogoSvg width={200} height={150} />

      <SignUpForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confPassword={confPassword}
        setConfPassword={setConfPassword}
        isPasswordVisible={isPasswordVisible}
        togglePasswordVisibility={togglePasswordVisibility}
        handleSignUp={handleSignUp}
        isLoading={isLoading}
        theme={theme}
      />
    </View>
  );
}

export default SignUp;
