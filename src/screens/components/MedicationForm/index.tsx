import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import shadow, { Theme } from "../../../utils/styles/index";
import * as Animatable from "react-native-animatable";
import Auth from "../../../models/Auth";
import { createMedication } from "../../../api/requests/medication/create";
import { useToast } from "../../../context/ToastContext";
import CreateMedicationDTO from "../../../models/dto/CreateMedicationDTO";

interface MedicationFormProps {
  auth: Auth;
  theme: Theme;
}

export default function MedicationForm({ auth, theme }: MedicationFormProps) {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const adicionarMedication = async () => {
    if (name.trim() !== "" && dosage.trim() !== "") {
      const novaMedication: CreateMedicationDTO = {
        name,
        dosage,
        user: { id: auth.id },
      };

      try {
        setLoading(true);
        await createMedication(auth.token, novaMedication);
        showToast("success", "Medicação adicionada com sucesso!");

        setName("");
        setDosage("");
      } catch (error) {
        console.error("Erro ao adicionar medicação:", error);
        showToast("error", "Erro ao adicionar medicação. Tente novamente mais tarde.");
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
        placeholder="Nome do Medicamento"
        placeholderTextColor={theme.COLORS.TEXT}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: theme.COLORS.PRIMARY, color: theme.COLORS.CONTENT },
        ]}
        placeholder="Dosagem"
        placeholderTextColor={theme.COLORS.TEXT}
        value={dosage}
        onChangeText={setDosage}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
        onPress={adicionarMedication}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={theme.COLORS.WHITE} />
        ) : (
          <Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>
            Registrar
          </Text>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
}
