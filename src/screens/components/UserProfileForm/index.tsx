import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import { styles } from "./styles";
import shadow, { Theme } from "../../../utils/styles/index";
import { formatBirthdateInput } from "../../../utils/FormatBirthdateInput";

const genderOptions = ["Masculino", "Feminino"];

interface UserProfileFormProps {
  name: string;
  lastname: string;
  email: string;
  dob: string;
  gender: string;
  setName: (text: string) => void;
  setLastName: (text: string) => void;
  setDob: (text: string) => void;
  setGender: (text: string) => void;
  handleUpdate: () => void;
  loading: boolean;
  theme: Theme;
}

export default function UserProfileForm({
  name,
  lastname,
  email,
  dob,
  gender,
  setName,
  setLastName,
  setDob,
  setGender,
  handleUpdate,
  loading,
  theme,
}: UserProfileFormProps) {
  return (
    <View
      style={[
        styles.containerForm,
        { backgroundColor: theme.COLORS.BACKGROUND, ...shadow.shadowOverlay },
      ]}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {[
          {
            label: "Nome",
            value: name,
            onChange: setName,
            placeholder: "Digite seu nome",
          },
          {
            label: "Sobrenome",
            value: lastname,
            onChange: setLastName,
            placeholder: "Digite seu sobrenome",
          },
          {
            label: "Data de Nascimento",
            value: dob,
            onChange: (text) => setDob(formatBirthdateInput(text)),
            placeholder: "Digite sua data de nascimento",
            keyboardType: "numeric",
          },
          {
            label: "Email",
            value: email,
            placeholder: "Digite seu email",
            editable: !email.trim(),
          },
        ].map(({ label, value, onChange, placeholder, editable = true }) => (
          <View key={label} style={styles.inputContainer}>
            <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>
              {label}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.COLORS.BACKGROUND_CARD,
                  color: theme.COLORS.CONTENT,
                },
              ]}
              placeholder={placeholder}
              onChangeText={onChange}
              value={value}
              editable={editable}
            />
          </View>
        ))}

        <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>
          Gênero:
        </Text>
        <View style={styles.checkboxContainer}>
          {genderOptions.map((genderOption) => (
            <View key={genderOption} style={styles.checkboxWrapper}>
              <Checkbox
                value={gender === genderOption}
                onValueChange={() => setGender(genderOption)}
                color={theme.COLORS.PRIMARY}
                style={styles.checkbox}
              />
              <Text style={[styles.label, { color: theme.COLORS.TEXT }]}>
                {genderOption}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleUpdate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>
            Salvar Perfil
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
