import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Medication from "../../models/Medication";
import MedicationForm from "../components/MedicationForm";
import MedicationItem from "../components/MedicationItem";
import Header from "../components/Header";
import { getMedicationsByUser } from "../../api/requests/medication/get";
import MedicationsList from "../../utils/MedicationsList";

const MedicationInfo = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [historicoVisivel, setHistoricoVisivel] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [formVisivel, setFormVisivel] = useState(false);

  const { authData } = useAuth();
  const auth = authData;
  const { theme } = useTheme();

  const carregarMedications = async () => {
    try {
      const medicationsRef = await getMedicationsByUser(auth.id, auth.token);
      setMedications(medicationsRef);
      setRefreshing(false);
    } catch (error) {
      console.error("Erro ao carregar medicações:", error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregarMedications();
  }, [carregarMedications]);

  useEffect(() => {
    carregarMedications();
  }, [carregarMedications]);

  const toggleScreen = () => {
    setHistoricoVisivel(prevState => !prevState);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <Header title={historicoVisivel ? "Lista" : "Medicamentos"} />

      <TouchableOpacity
        style={[styles.themeToggleButton, { backgroundColor: theme.COLORS.BACKGROUND }]}
        onPress={toggleScreen}
      >
        {historicoVisivel ? (
          <AntDesign name="arrowleft" size={30} color={theme.COLORS.ICON} />
        ) : (
          <MaterialIcons
            name="calendar-today"
            size={30}
            color={theme.COLORS.TITLE}
          />
        )}
      </TouchableOpacity>

      <View
        style={[styles.containerForm, { backgroundColor: theme.COLORS.BACKGROUND }]}
      >
        {!historicoVisivel && !formVisivel && (
          <MedicationForm MedicationsList={MedicationsList} auth={auth} theme={theme} />
        )}

        {historicoVisivel && (
          <FlatList
            data={medications}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              <Text style={[styles.textoVazio, { color: theme.COLORS.TEXT }]}>
                Nenhuma medicação encontrada
              </Text>
            }
            renderItem={({ item }) => (
              <MedicationItem theme={theme} medication={item} auth={auth} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default MedicationInfo;
