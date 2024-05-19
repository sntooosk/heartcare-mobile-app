import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import ModalEdicao from "../ModalEdit";
import * as Animatable from "react-native-animatable";
import shadow, { Theme } from '../../../utils/styles/index';
import Pressure from "../../../models/Pressure";
import Auth from "../../../models/Auth";

interface PressureItemProps {
  pressure: Pressure;
  deletePressure: (pressureId: number) => void;
  theme: Theme;
  auth: Auth;
}

export default function PressureItem({
  pressure,
  deletePressure,
  theme,
  auth,
}: PressureItemProps) {

  const [modalVisivel, setModalVisivel] = useState(false);


  const abrirModal = () => {
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  const salvarEdicao = () => {
    fecharModal();
  };

  const avaliarPressao = () => {
    const sistolica = parseFloat(pressure.sistolica);
    const diastolica = parseFloat(pressure.diastolica);

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
        { backgroundColor: theme.COLORS.BACKGROUND_CARD,
          ...shadow.shadowOverlay
         },
      ]}
    >
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Sistólica:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {pressure.sistolica}
        </Text>
      </Text>
      <Text style={[styles.textPressure, { color: theme.COLORS.CONTENT }]}>
        Diastólica:{" "}
        <Text style={{ fontWeight: "bold", fontSize: 13 }}>
          {pressure.diastolica}
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
          style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
          onPress={abrirModal}
        >
          <Text
            style={[styles.textBotao, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Editar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.COLORS.BUTTON }]}
          onPress={() => deletePressure(pressure.id)}
        >
          <Text
            style={[styles.textBotao, { color: theme.COLORS.BUTTON_TEXT }]}
          >
            Excluir
          </Text>
        </TouchableOpacity>
      </View>

      <ModalEdicao
        visivel={modalVisivel}
        fecharModal={fecharModal}
        pressure={pressure}
        salvarEdicao={salvarEdicao}
        theme={theme} auth={auth}      />
    </Animatable.View>
  );
}
