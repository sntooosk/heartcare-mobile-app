import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "../../../context/ThemeContext";
import { styles } from "./styles";

interface ResetPasswordFormProps {
  resetEmail: string;
  setResetEmail: (email: string) => void;
  handleEnvioCodigoOtp: () => void;
  loading: boolean;
}

export default function ResetPasswordForm({
  resetEmail,
  setResetEmail,
  handleEnvioCodigoOtp,
  loading,
}: ResetPasswordFormProps) {
  const { theme } = useTheme();

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.containerForm,
        { backgroundColor: theme.COLORS.BACKGROUND },
      ]}
    >
      <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>
        Recuperar Senha
      </Text>
      <TextInput
        placeholder="Digite seu e-mail"
        placeholderTextColor={theme.COLORS.TEXT}
        value={resetEmail}
        style={[
          styles.input,
          {
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
            color: theme.COLORS.CONTENT,
          },
        ]}
        onChangeText={(text) => setResetEmail(text)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleEnvioCodigoOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Recuperar Senha
          </Text>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
}
