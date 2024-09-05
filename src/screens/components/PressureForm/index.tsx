import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import shadow, { Theme } from "../../../utils/styles/index";
import * as Animatable from "react-native-animatable";
import Auth from "../../../models/Auth";
import { create } from "../../../api/requests/pressure/create";
import { useToast } from "../../../context/ToastContext";

interface PressureFormProps {
  auth: Auth;
  theme: Theme;
}

export default function PressureForm({ auth, theme }: PressureFormProps) {
  const [sistolica, setSistolica] = useState("");
  const [diastolica, setDiastolica] = useState("");
  const [pulso, setPulso] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const adicionarPressure = async () => {
    if (
      sistolica.trim() !== "" &&
      diastolica.trim() !== "" &&
      pulso.trim() !== ""
    ) {
      const novaPressure = {
        systolic: sistolica,
        diastolic: diastolica,
        pulse: pulso,
        user: { id: auth.id },
      };

      try {
        setLoading(true);
        await create(auth.token, novaPressure);
        showToast("success", "Medição adicionada com sucesso!");

        setSistolica("");
        setDiastolica("");
        setPulso("");
      } catch (error) {
        console.error("Erro ao adicionar medição:", error);
        showToast(
          "error",
          "Erro ao adicionar medição. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    } else {
      showToast("error", "Por favor, preencha todos os campos");
    }
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.container,
        {
          backgroundColor: theme.COLORS.BACKGROUND_CARD,
          ...shadow.shadowOverlay,
        },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          { borderColor: theme.COLORS.PRIMARY, color: theme.COLORS.CONTENT },
        ]}
        placeholder="Digite a sistólica"
        placeholderTextColor={theme.COLORS.TEXT}
        value={sistolica}
        onChangeText={setSistolica}
        keyboardType="numeric"
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: theme.COLORS.PRIMARY, color: theme.COLORS.CONTENT },
        ]}
        placeholder="Digite a diastólica"
        placeholderTextColor={theme.COLORS.TEXT}
        value={diastolica}
        onChangeText={setDiastolica}
        keyboardType="numeric"
      />

      <TextInput
        style={[
          styles.input,
          { borderColor: theme.COLORS.PRIMARY, color: theme.COLORS.CONTENT },
        ]}
        placeholder="Digite o pulso"
        placeholderTextColor={theme.COLORS.TEXT}
        value={pulso}
        onChangeText={setPulso}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={adicionarPressure}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text
            style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Registrar
          </Text>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
}
