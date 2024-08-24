import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Platform, Switch } from "react-native";
import { styles } from "./styles";
import ModalEdicao from "../ModalEdit";
import * as Animatable from "react-native-animatable";
import shadow, { Theme } from "../../../utils/styles/index";
import Pressure from "../../../models/Pressure";
import Auth from "../../../models/Auth";
import { deletar } from "../../../api/requests/pressure/delete";
import { useToast } from "../../../context/ToastContext";
import { FontAwesome } from "@expo/vector-icons";

interface PressureItemProps {
  pressure: Pressure;
  theme: Theme;
  auth: Auth;
}

export default function PressureItem({
  pressure,
  theme,
  auth,
}: PressureItemProps) {
  const [modalVisivel, setModalVisivel] = useState(false);

  const { showToast } = useToast();

  const abrirModal = () => {
    setModalVisivel(true);
  };

  const deletePressures = async () => {
    try {
      if (Platform.OS === "web") {
        if (window.confirm("Deseja apagar esta medição?")) {
          try {
            await deletar(auth.id, auth.token);
            showToast("success", "Medição excluída com sucesso!");
          } catch (error) {
            console.error("Erro ao excluir medição:", error);
            showToast("error", "Erro ao excluir medição. Tente novamente mais tarde.");
          }
        }
      } else {
        Alert.alert(
          "Confirmação",
          "Deseja apagar esta medição?",
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Apagar",
              onPress: async () => {
                try {
                  await deletar(pressure.id, auth.token);
                  showToast("success", "Medição excluída com sucesso!");
                } catch (error) {
                  console.error("Erro ao excluir medição:", error);
                  showToast("error", "Erro ao excluir medição. Tente novamente mais tarde.");
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

  const fecharModal = () => {
    setModalVisivel(false);
  };

  const avaliarPressao = () => {
    const sistolica = parseFloat(pressure.systolic);
    const diastolica = parseFloat(pressure.diastolic);

    if (!isNaN(sistolica) && !isNaN(diastolica)) {
      if (sistolica < 90 && diastolica < 60) {
        return "Pressão baixa";
      } else if (
        sistolica >= 90 &&
        sistolica <= 120 &&
        diastolica >= 60 &&
        diastolica <= 80
      ) {
        return "Pressão normal";
      } else if (
        sistolica > 120 &&
        diastolica > 80 &&
        sistolica <= 140 &&
        diastolica <= 90
      ) {
        return "Pré-hipertensão";
      } else if (
        sistolica > 140 &&
        diastolica > 90 &&
        sistolica <= 160 &&
        diastolica <= 100
      ) {
        return "Hipertensão estágio 1";
      } else if (sistolica > 160 && diastolica > 100) {
        return "Hipertensão estágio 2";
      } else {
        return "Pressão não classificada";
      }
    } else {
      return "Valores inválidos";
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
        Sistólica:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {pressure.systolic}
        </Text>
      </Text>
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Diastólica:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {pressure.diastolic}
        </Text>
      </Text>
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Pulso:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {pressure.pulse}
        </Text>
      </Text>
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Data:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {new Date(pressure.date).toLocaleDateString()}
        </Text>
      </Text>
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Hora:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {new Date(pressure.date).toLocaleTimeString()}
        </Text>
      </Text>
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Avaliação:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {avaliarPressao()}
        </Text>
      </Text>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={abrirModal}
        >
        <FontAwesome name="edit" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => deletePressures()}
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
}
