import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { themes } from "../../../utils/styles/colors";

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
}

export default function SignUpForm({
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
}: SignUpFormProps) {
  return (
    <View
      style={[
        styles.containerForm,
        { backgroundColor: themes.COLORS.BACKGROUND },
      ]}
    >
      <Text style={[styles.title, { color: themes.COLORS.TITLE }]}>Name</Text>
      <TextInput
        placeholder={"Jonh Doe"}
        placeholderTextColor={themes.COLORS.TEXT}
        style={[styles.input, { color: themes.COLORS.CONTENT }]}
        onChangeText={(text) => setName(text)}
      />

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

      <Text style={[styles.title, { color: themes.COLORS.TITLE }]}>
        Confirm Password
      </Text>
      <TextInput
        placeholder={"Confirm your password"}
        placeholderTextColor={themes.COLORS.TEXT}
        style={[styles.input, { color: themes.COLORS.CONTENT }]}
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
            { color: themes.COLORS.TEXT },
          ]}
        >
          {isPasswordVisible ? "Hide password" : "Show password"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themes.COLORS.BUTTON }]}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={themes.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: themes.COLORS.BUTTON_TEXT }]}
          >
            Register
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
