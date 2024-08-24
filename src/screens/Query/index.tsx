import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { styles } from "./styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import Pressure from "../../models/Pressure";
import { useAuth } from "../../context/AuthContext";
import PressureForm from "../components/PressureForm";
import PressureItem from "../components/PressureItem";
import Header from "../components/Header";
import { get } from "../../api/requests/pressure/get";

function Query() {
  const [pressures, setPressures] = useState<Pressure[]>([]);
  const [historicoVisivel, setHistoricoVisivel] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [AtividadesVisivel, setAtividadesVisivel] = useState(false);

  const { authData } = useAuth();
  const auth = authData;

  const { theme } = useTheme();

  const carregarPressures = async () => {
    try {
      const pressuresRef = await get(auth.id, auth.token);
      setPressures(pressuresRef);
      setRefreshing(false);
    } catch (error) {
    }
  };

  const onRefresh = useCallback(() => {
    carregarPressures();
  }, [carregarPressures]);

  useEffect(() => {
    carregarPressures();
  }, [carregarPressures]);

  const toggleScreen = () => {
    setHistoricoVisivel(!historicoVisivel);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}
    >
      <Header
        title={historicoVisivel ? "Histórico" : "Atividades"}
      />
      {historicoVisivel ? (
        <TouchableOpacity
          style={[
            styles.themeToggleButton,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
          onPress={toggleScreen}
        >
          <AntDesign name="arrowleft" size={30} color={theme.COLORS.ICON} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.themeToggleButton,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
          onPress={toggleScreen}
        >
          <MaterialIcons
            name={"calendar-today"}
            size={30}
            color={theme.COLORS.TITLE}
          />
        </TouchableOpacity>
      )}

      <View
        style={[
          styles.containerForm,
          { backgroundColor: theme.COLORS.BACKGROUND },
        ]}
      >
        {!historicoVisivel && (
          <>
            {!AtividadesVisivel && <PressureForm auth={auth} theme={theme} />}
          </>
        )}
        {historicoVisivel && (
          <>
            <FlatList
              data={pressures}
              ListEmptyComponent={
                <Text style={[styles.textoVazio, { color: theme.COLORS.TEXT }]}>
                  Nenhuma medição encontrada
                </Text>
              }
              renderItem={({ item }) => (
                <PressureItem theme={theme} pressure={item} auth={auth} />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </View>
  );
}

export default Query;
