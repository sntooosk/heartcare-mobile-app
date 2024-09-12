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
import Auth from "../../../models/Auth";
import { updateMedication } from "../../../api/requests/medication/update";
import { useToast } from "../../../context/ToastContext";
import Medication from "../../../models/Medication";
import UpdateMedicationDTO from "../../../models/dto/UpdateMedicationDTO";

interface ModalEdicaoProps {
  visivel: boolean;
  fecharModal: () => void;
  medication: Medication;
  theme: Theme;
  auth: Auth;
}

const ModalEdicao: React.FC<ModalEdicaoProps> = ({ visivel, fecharModal, medication, theme, auth }) => {
  const [nameEditada, setNameEditada] = useState(medication.name);
  const [dosageEditada, setDosageEditada] = useState(medication.dosage);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const salvarEdicao = async () => {
    try {
      setLoading(true);

      const medicationParaAtualizar: UpdateMedicationDTO = {
        id: medication.id,
        name: nameEditada,
        dosage: dosageEditada,
        user: {
          id: auth.id,
        },
      };

      await updateMedication(medication.id, auth.token, medicationParaAtualizar);
      fecharModal();
      showToast("success", "Edição realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar medicamento:", error);
      showToast("error", "Erro ao editar medicamento. Tente novamente mais tarde.");
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
            Editar Medicamento
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.CONTENT,
              },
            ]}
            placeholder="Nome"
            value={nameEditada}
            onChangeText={setNameEditada}
          />
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
                color: theme.COLORS.CONTENT,
              },
            ]}
            placeholder="Dosagem"
            value={dosageEditada}
            onChangeText={setDosageEditada}
          />

          <TouchableOpacity
            style={[styles.button, { borderColor: theme.COLORS.PRIMARY }]}
            onPress={salvarEdicao}
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
};

export default ModalEdicao;
