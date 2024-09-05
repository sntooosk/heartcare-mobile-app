import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../../routes/types";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../../utils/styles";

interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
  handleLogin: () => void;
  isLoading: boolean;
  theme: Theme;
  handleForgotPassword: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  isPasswordVisible,
  togglePasswordVisibility,
  handleLogin,
  isLoading,
  theme,
  handleForgotPassword,
}) => {
  const { navigate } = useNavigation<propsStack>();

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.containerForm,
        { backgroundColor: theme.COLORS.BACKGROUND },
      ]}
    >
      <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>Email</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        placeholderTextColor={theme.COLORS.TEXT}
        value={email}
        style={[
          styles.input,
          {
            backgroundColor: theme.COLORS.BACKGROUND_CARD,
            color: theme.COLORS.CONTENT,
          },
        ]}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>Senha</Text>
      <View
        style={[
          styles.inputArea,
          { backgroundColor: theme.COLORS.BACKGROUND_CARD },
        ]}
      >
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor={theme.COLORS.TEXT}
          style={[
            styles.inputPassword,
            {
              backgroundColor: theme.COLORS.BACKGROUND_CARD,
              color: theme.COLORS.CONTENT,
            },
          ]}
          value={password}
          secureTextEntry={!isPasswordVisible}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={[
            styles.icon,
            { backgroundColor: theme.COLORS.BACKGROUND_CARD },
          ]}
          onPress={togglePasswordVisibility}
        >
          <Ionicons
            name={isPasswordVisible ? "eye" : "eye-off"}
            color={theme.COLORS.TEXT}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, { alignItems: "flex-end", paddingBottom: 20 }]}
        onPress={handleForgotPassword}
      >
        <Text
          style={[
            styles.togglePasswordButtonText,
            { color: theme.COLORS.TEXT },
          ]}
        >
          Esqueceu a senha?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Acessar
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigate("SignUp")}
        style={[styles.buttonRegister, { borderColor: theme.COLORS.PRIMARY }]}
      >
        <Text style={[styles.buttonText, { color: theme.COLORS.PRIMARY }]}>
          Não possui conta?
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default SignInForm;
