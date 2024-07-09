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

interface ResetPasswordForm3Props {
  Password: string;
  setPassword: (Password: string) => void;
  confPassword: string;
  setConfPassword: (confPassword: string) => void;
  handleMudarAsenha: () => void;
  loading: boolean;
}

const ResetPasswordForm3: React.FC<ResetPasswordForm3Props> = ({
  Password,
  setPassword,
  confPassword,
  setConfPassword,
  handleMudarAsenha,
  loading,
}: ResetPasswordForm3Props) => {
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
        placeholder="Digite sua nova senha"
        placeholderTextColor={theme.COLORS.TEXT}
        value={Password}
        style={[
          styles.input,
          {
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
            color: theme.COLORS.CONTENT,
          },
        ]}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirme sua nova senha"
        placeholderTextColor={theme.COLORS.TEXT}
        value={confPassword}
        style={[
          styles.input,
          {
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
            color: theme.COLORS.CONTENT,
          },
        ]}
        onChangeText={(text) => setConfPassword(text)}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleMudarAsenha}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Mudar a senha
          </Text>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default ResetPasswordForm3;
