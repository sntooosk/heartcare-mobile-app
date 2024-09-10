import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";

import { styles } from "./styles";
import shadow, { Theme } from "../../../utils/styles/index";
import Medication from "../../../models/Medication";
import Auth from "../../../models/Auth";
import { useToast } from "../../../context/ToastContext";
import { deleteMedication } from "../../../api/requests/medication/delete";
import ModalEdicao from "../ModalEditMedication";

interface MedicationItemProps {
  medication: Medication;
  theme: Theme;
  auth: Auth;
}

export default function MedicationItem({
  medication,
  theme,
  auth,
}: MedicationItemProps) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const { showToast } = useToast();

  const abrirModal = () => {
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  const deleteMedicationItem = async () => {
    const confirmMessage = "Deseja apagar este medicamento?";

    try {
      if (Platform.OS === "web") {
        if (window.confirm(confirmMessage)) {
          await deleteMedication(medication.id, auth.token);
          showToast("success", "Medicamento excluído com sucesso!");
        }
      } else {
        Alert.alert(
          "Confirmação",
          confirmMessage,
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Apagar",
              onPress: async () => {
                try {
                  await deleteMedication(medication.id, auth.token);
                  showToast("success", "Medicamento excluído com sucesso!");
                } catch (error) {
                  console.error("Erro ao excluir medicamento:", error);
                  showToast(
                    "error",
                    "Erro ao excluir medicamento. Tente novamente mais tarde."
                  );
                }
              },
            },
          ],
          { cancelable: true }
        );
      }
    } catch (error) {
      console.error("Erro ao confirmar exclusão:", error);
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
      <Text style={[styles.textMedication, { color: theme.COLORS.CONTENT }]}>
        Nome:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {medication.name}
        </Text>
      </Text>
      <Text style={[styles.textMedication, { color: theme.COLORS.CONTENT }]}>
        Dosagem:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {medication.dosage} mg
        </Text>
      </Text>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[styles.button, { borderColor: theme.COLORS.PRIMARY }]}
          onPress={abrirModal}
        >
          <FontAwesome name="edit" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { borderColor: theme.COLORS.PRIMARY }]}
          onPress={deleteMedicationItem}
        >
          <FontAwesome name="trash" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      </View>
      <ModalEdicao
        visivel={modalVisivel}
        fecharModal={fecharModal}
        medication={medication}
        theme={theme}
        auth={auth}
      />
    </Animatable.View>
  );
}
