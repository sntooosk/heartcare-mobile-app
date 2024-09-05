import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { propsStack } from "../../../routes/types";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "../../../utils/styles";

interface SignUpFormProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confPassword: string;
  setConfPassword: (value: string) => void;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
  handleSignUp: () => void;
  isLoading: boolean;
  theme: Theme;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confPassword,
  setConfPassword,
  isPasswordVisible,
  togglePasswordVisibility,
  handleSignUp,
  isLoading,
  theme,
}) => {
  const { navigate } = useNavigation<propsStack>();

  return (
    <ScrollView
      style={[
        styles.containerForm,
        { backgroundColor: theme.COLORS.BACKGROUND },
      ]}
    >
      <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>Nome:</Text>
      <TextInput
        placeholder="Digite seu nome"
        placeholderTextColor={theme.COLORS.TEXT}
        style={[
          styles.input,
          {
            color: theme.COLORS.CONTENT,
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
          },
        ]}
        onChangeText={(text) => setName(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>Email:</Text>
      <TextInput
        placeholder="Digite seu email"
        placeholderTextColor={theme.COLORS.TEXT}
        style={[
          styles.input,
          {
            color: theme.COLORS.CONTENT,
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
          },
        ]}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>Senha:</Text>
      <TextInput
        placeholder="Digite sua senha"
        placeholderTextColor={theme.COLORS.TEXT}
        style={[
          styles.input,
          {
            color: theme.COLORS.CONTENT,
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
          },
        ]}
        value={password}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(text) => setPassword(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>
        Confirme sua senha:
      </Text>
      <TextInput
        placeholder="Confirme sua senha"
        placeholderTextColor={theme.COLORS.TEXT}
        style={[
          styles.input,
          {
            color: theme.COLORS.CONTENT,
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
          },
        ]}
        value={confPassword}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(text) => setConfPassword(text)}
      />

      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.togglePasswordButton}
      >
        <Text
          style={[
            styles.togglePasswordButtonText,
            { color: theme.COLORS.TEXT },
          ]}
        >
          {isPasswordVisible ? "Esconder senha" : "Mostrar senha"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Registrar
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate("SignIn")}
        style={[styles.buttonRegister, { borderColor: theme.COLORS.PRIMARY }]}
      >
        <Text style={[styles.buttonText, { color: theme.COLORS.PRIMARY }]}>
          Já possui conta?
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpForm;
