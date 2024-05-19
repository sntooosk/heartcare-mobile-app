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

const genderOptions = ["Masculino", "Feminino", "Prefiro não dizer"];

interface UserProfileFormProps {
  name: string;
  lastName: string;
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

export default function UserProfileForm(props: UserProfileFormProps) {
  const {
    name,
    lastName,
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
  } = props;

  return (
    <View
      style={[
        styles.containerForm,
        { backgroundColor: theme.COLORS.BACKGROUND, ...shadow.shadowOverlay },
      ]}
    >
      <ScrollView>
        <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>Nome:</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.COLORS.BACKGROUND_CARD,
              color: theme.COLORS.CONTENT,
            },
          ]}
          placeholder="Digite seu nome"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>
          Sobrenome:
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.COLORS.BACKGROUND_CARD,
              color: theme.COLORS.CONTENT,
            },
          ]}
          placeholder="Digite seu sobrenome"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>
          Data de Nascimento:
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.COLORS.BACKGROUND_CARD,
              color: theme.COLORS.CONTENT,
            },
          ]}
          placeholder="Digite sua data de nascimento"
          onChangeText={(text) => setDob(formatBirthdateInput(text))}
          value={dob}
          keyboardType="numeric"
        />
        <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>
          Gênero:
        </Text>
        <View style={styles.checkboxContainerDoc}>
          {genderOptions.map((genderOption) => (
            <View key={genderOption}>
              <Text style={[styles.label, { color: theme.COLORS.TEXT }]}>
                {genderOption}
              </Text>
              <Checkbox
                value={gender === genderOption}
                onValueChange={() => setGender(genderOption)}
                color={theme.COLORS.PRIMARY}
                style={styles.checkbox}
              />
            </View>
          ))}
        </View>
        <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>
          Email:
        </Text>
        <TextInput
          style={[styles.input, { color: email.trim() ? "gray" : "black" }]}
          placeholder="Digite seu email"
          value={email}
          pointerEvents={email.trim() ? "none" : "auto"}
        />
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={handleUpdate}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Salvar Perfil
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
