import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import styles from "./styles";
import Pressure from "../../../models/Pressure";
import shadow, { Theme } from "../../../utils/styles";

const screenWidth = Dimensions.get("window").width;

interface PressureChartProps {
  pressure: Pressure[];
  theme: Theme;
}

// Função para pegar o dia da semana em português
const getDiaDaSemana = (date: Date) => {
  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return dias[date.getDay()];
};

const PressureChart: React.FC<PressureChartProps> = ({ pressure, theme }) => {
  // Pegar as últimas 7 medições de pressão
  const ultimasSeteMedicoes = pressure.slice(-7);

  // Extrair os labels e dados das últimas 7 medições
  const labels = ultimasSeteMedicoes.map((p) => getDiaDaSemana(new Date(p.date))); // Mostrar o dia da semana
  const dadosSistolicos = ultimasSeteMedicoes.map((p) => parseFloat(p.systolic)); // Transformar os valores sistólicos em números
  const dadosDiastolicos = ultimasSeteMedicoes.map((p) => parseFloat(p.diastolic)); // Transformar os valores diastólicos em números

  const data = {
    labels: labels,
    datasets: [
      {
        data: dadosSistolicos,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Vermelho para a pressão sistólica
        strokeWidth: 2,
        label: "Sistólica",
      },
      {
        data: dadosDiastolicos,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Azul para a pressão diastólica
        strokeWidth: 2,
        label: "Diastólica",
      },
    ],
    legend: ["Sistólica", "Diastólica"], // Legenda em português
  };

  const chartConfig = {
    backgroundGradientFrom: theme.COLORS.BACKGROUND_CARD,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: theme.COLORS.BACKGROUND,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => theme.COLORS.TEXT, // Cor dos rótulos baseada no tema
    fillShadowGradient: theme.COLORS.CHART_FILL, // Preenchimento do gráfico baseado no tema
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // Sem casas decimais
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: theme.COLORS.CHART_LINE,
    },
    gridColor: theme.COLORS.CHART_GRID,
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.COLORS.BACKGROUND_CARD,
          ...shadow.shadowOverlay,
        },
      ]}
    >
      <LineChart
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};

export default PressureChart;
