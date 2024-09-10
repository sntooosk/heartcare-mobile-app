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
import ModalEdicao from "../ModalEditPressure";
import * as Animatable from "react-native-animatable";
import shadow, { Theme } from "../../../utils/styles/index";
import Pressure from "../../../models/Pressure";
import Auth from "../../../models/Auth";
import { useToast } from "../../../context/ToastContext";
import { FontAwesome } from "@expo/vector-icons";
import { deletePressure } from "../../../api/requests/pressure/delete";

interface PressureItemProps {
  pressure: Pressure;
  theme: Theme;
  auth: Auth;
}

const PressureItem: React.FC<PressureItemProps> = ({ pressure, theme, auth }) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const { showToast } = useToast();

  const abrirModal = () => setModalVisivel(true);

  const fecharModal = () => setModalVisivel(false);

  const avaliarPressao = () => {
    const sistolica = parseFloat(pressure.systolic);
    const diastolica = parseFloat(pressure.diastolic);

    if (isNaN(sistolica) || isNaN(diastolica)) {
      return "Valores inválidos";
    }

    if (sistolica < 90 && diastolica < 60) return "Pressão baixa";
    if (sistolica <= 120 && diastolica <= 80) return "Pressão normal";
    if (sistolica <= 140 && diastolica <= 90) return "Pré-hipertensão";
    if (sistolica <= 160 && diastolica <= 100) return "Hipertensão estágio 1";
    if (sistolica > 160 && diastolica > 100) return "Hipertensão estágio 2";

    return "Pressão não classificada";
  };

  const tempoDesdePressure = (data: Date) => {
    const diferencaMs = new Date().getTime() - new Date(data).getTime();
    const segundos = Math.floor(diferencaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) return `${dias} ${dias === 1 ? "dia" : "dias"} atrás`;
    if (horas > 0) return `${horas} ${horas === 1 ? "hora" : "horas"} atrás`;
    if (minutos > 0) return `${minutos} ${minutos === 1 ? "minuto" : "minutos"} atrás`;
    return "Agora mesmo";
  };

  const deletePressures = async () => {
    try {
      const confirmMessage = "Deseja apagar esta medição?";

      if (Platform.OS === "web") {
        if (window.confirm("Deseja apagar esta medição?")) {
          try {
            await deletePressure(auth.id, auth.token);
            showToast("success", "Medição excluída com sucesso!");
          } catch (error) {
            console.error("Erro ao excluir medição:", error);
            showToast(
              "error",
              "Erro ao excluir medição. Tente novamente mais tarde."
            );
          }
        }
      } else {
        Alert.alert(
          "Confirmação",
          confirmMessage,
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Apagar",
              onPress: async () => {
                try {
                  await deletePressure(pressure.id, auth.token);
                  showToast("success", "Medição excluída com sucesso!");
                } catch (error) {
                  console.error("Erro ao excluir medição:", error);
                  showToast("error", "Erro ao excluir medição. Tente novamente mais tarde.");
                }
              }
            }
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
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Sistólica: <Text style={{ fontWeight: "bold", fontSize: 13 }}>{pressure.systolic}</Text>
      </Text>
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Diastólica: <Text style={{ fontWeight: "bold", fontSize: 13 }}>{pressure.diastolic}</Text>
      </Text>
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Pulso: <Text style={{ fontWeight: "bold", fontSize: 13 }}>{pressure.pulse}</Text>
      </Text>
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Medido a: <Text style={{ fontWeight: "bold", fontSize: 13 }}>{tempoDesdePressure(pressure.date)}</Text>
      </Text>
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Avaliação: <Text style={{ fontWeight: "bold", fontSize: 13 }}>{avaliarPressao()}</Text>
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
          onPress={deletePressures}
        >
          <FontAwesome name="trash" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      </View>
      <ModalEdicao
        visivel={modalVisivel}
        fecharModal={fecharModal}
        pressure={pressure}
        theme={theme}
        auth={auth}
      />
    </Animatable.View>
  );
};

export default PressureItem;
