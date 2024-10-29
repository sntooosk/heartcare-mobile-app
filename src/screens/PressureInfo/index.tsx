import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import PressureForm from "../components/PressureForm";
import PressureItem from "../components/PressureItem";
import Header from "../components/Header";
import { getPressureByUser } from "../../api/requests/pressure/get";
import PressureChart from "../components/PressureChart";
import Pressure from "../../models/Pressure";

function PressureInfo() {
  const { theme } = useTheme();
  const { authData } = useAuth();
  const [pressures, setPressures] = useState<Pressure[]>([]);
  const [historicoVisivel, setHistoricoVisivel] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const carregarPressures = async () => {
    try {
      const pressuresRef = await getPressureByUser(authData.id, authData.token);
      setPressures(
        pressuresRef.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
      setRefreshing(false);
    } catch (error) {
      console.error("Error loading pressures:", error);
    }
  };

  const onRefresh = useCallback(() => {
    carregarPressures();
  }, []);

  useEffect(() => {
    carregarPressures();
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}
    >
      <Header title={historicoVisivel ? "Histórico" : "Medições"} />
      <TouchableOpacity
        style={[
          styles.themeToggleButton,
          { backgroundColor: theme.COLORS.BACKGROUND },
        ]}
        onPress={() => setHistoricoVisivel(!historicoVisivel)}
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
        style={[
          styles.containerForm,
          { backgroundColor: theme.COLORS.BACKGROUND },
        ]}
      >
        {historicoVisivel ? (
          <FlatList
            ListHeaderComponent={
              <PressureChart pressure={pressures} theme={theme} />
            }
            data={pressures}
            ListEmptyComponent={
              <Text style={[styles.textoVazio, { color: theme.COLORS.TEXT }]}>
                Nenhuma medição encontrada
              </Text>
            }
            renderItem={({ item }) => (
              <PressureItem theme={theme} pressure={item} auth={authData} />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <PressureForm auth={authData} theme={theme} />
        )}
      </View>
    </View>
  );
}

export default PressureInfo;
