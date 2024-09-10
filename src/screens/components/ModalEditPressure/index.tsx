import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import shadow, { Theme } from "../../../utils/styles/index";
import Pressure from "../../../models/Pressure";
import Auth from "../../../models/Auth";
import { useToast } from "../../../context/ToastContext";
import { updatePressure } from "../../../api/requests/pressure/update";

interface ModalEdicaoProps {
  visivel: boolean;
  fecharModal: () => void;
  pressure: Pressure;
  theme: Theme;
  auth: Auth;
}

export default function ModalEdicao({
  visivel,
  fecharModal,
  pressure,
  theme,
  auth,
}: ModalEdicaoProps) {
  const [sistolicaEditada, setSistolicaEditada] = useState(pressure.systolic);
  const [diastolicaEditada, setDiastolicaEditada] = useState(
    pressure.diastolic
  );
  const [pulsoEditado, setPulsoEditado] = useState(pressure.pulse);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const SalvarEdicao = async () => {
    try {
      setLoading(true);

      const PressureParaAtualizar = {
        id: pressure.id,
        systolic: sistolicaEditada,
        diastolic: diastolicaEditada,
        date: pressure.date,
        pulse: pulsoEditado,
        user: {
          id: auth.id,
        },
      };

      await updatePressure(pressure.id, auth.token, PressureParaAtualizar);
      fecharModal();
      showToast("success", "Edição realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar medição:", error);
      showToast("error", "Erro ao editar medição. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visivel} transparent animationType="slide">
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: theme.COLORS.OVERLAY },
        ]}
      >
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: theme.COLORS.BACKGROUND,
              ...shadow.shadowOverlay,
            },
          ]}
        >
          <View style={{ alignItems: "flex-end" }}>
            <AntDesign
              onPress={fecharModal}
              name="close"
              size={25}
              color={theme.COLORS.ICON}
            />
          </View>
          <Text style={[styles.textoModal, { color: theme.COLORS.TITLE }]}>
            Editar Medição
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.CONTENT,
              },
            ]}
            placeholder="Sistólica"
            value={sistolicaEditada}
            onChangeText={(texto) => setSistolicaEditada(texto)}
            keyboardType="numeric"
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.CONTENT,
              },
            ]}
            placeholder="Diastólica"
            value={diastolicaEditada}
            onChangeText={(texto) => setDiastolicaEditada(texto)}
            keyboardType="numeric"
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.CONTENT,
              },
            ]}
            placeholder="Pulso"
            value={pulsoEditado}
            onChangeText={(texto) => setPulsoEditado(texto)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={[styles.button, { borderColor: theme.COLORS.PRIMARY }]}
            onPress={SalvarEdicao}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={[styles.textoBotao, { color: theme.COLORS.TEXT }]}>
                Salvar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
