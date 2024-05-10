import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../../routes/types";
import { themes } from "../../../utils/styles/colors";

interface SignInFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
  handleLogin: () => void;
  isLoading: boolean;
}

export default function SignInForm({
  email,
  setEmail,
  password,
  setPassword,
  isPasswordVisible,
  togglePasswordVisibility,
  handleLogin,
  isLoading,
}: SignInFormProps) {
  const { navigate } = useNavigation<propsStack>();

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.containerForm,
        { backgroundColor: themes.COLORS.BACKGROUND },
      ]}
    >
      <Text style={[styles.title, { color: themes.COLORS.TITLE }]}>
        Email Address
      </Text>
      <TextInput
        placeholder={"alex@email.com"}
        placeholderTextColor={themes.COLORS.TEXT}
        style={[styles.input, { color: themes.COLORS.CONTENT }]}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={[styles.title, { color: themes.COLORS.TITLE }]}>
        Password
      </Text>
      <TextInput
        placeholder={"Enter your password"}
        placeholderTextColor={themes.COLORS.TEXT}
        style={[styles.input, { color: themes.COLORS.CONTENT }]}
        value={password}
        secureTextEntry={!isPasswordVisible}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.togglePasswordButton}
      >
        <Text
          style={[
            styles.togglePasswordButtonText,
            { color: themes.COLORS.TEXT },
          ]}
        >
          {isPasswordVisible ? "Hide password" : "Show password"}{" "}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themes.COLORS.BUTTON }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={themes.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: themes.COLORS.BUTTON_TEXT }]}
          >
            Login Now
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate("SignUp")}
        style={[
          styles.buttonRegister,
          {
            backgroundColor: themes.COLORS.WHITE,
            borderColor: themes.COLORS.BUTTON,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: themes.COLORS.BUTTON }]}>
          Signup Now
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}
