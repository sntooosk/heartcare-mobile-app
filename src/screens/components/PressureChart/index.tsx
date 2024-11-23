import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Pressure from "../../../models/Pressure";
import shadow, { Theme } from "../../../utils/styles";
import styles from "./styles";

const screenWidth = Dimensions.get("window").width;

interface PressureChartProps {
  pressure: Pressure[];
  theme: Theme;
}

const getDiaDaSemana = (date: Date) => {
  const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return dias[date.getDay()];
};

const PressureChart: React.FC<PressureChartProps> = ({ pressure, theme }) => {
  const defaultData = [
    { date: new Date().toISOString(), systolic: 0, diastolic: 0 },
  ];

  const ultimasSeteMedicoes = pressure.length > 0 ? pressure.slice(-7) : defaultData;

  const labels = ultimasSeteMedicoes.map((p) => getDiaDaSemana(new Date(p.date)));
  const dadosSistolicos = ultimasSeteMedicoes.map((p) => parseFloat(p.systolic));
  const dadosDiastolicos = ultimasSeteMedicoes.map((p) => parseFloat(p.diastolic));

  const data = {
    labels: labels,
    datasets: [
      {
        data: dadosSistolicos,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
        label: "Sistólica",
      },
      {
        data: dadosDiastolicos,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
        label: "Diastólica",
      },
    ],
    legend: ["Sistólica", "Diastólica"],
  };

  const chartConfig = {
    backgroundGradientFrom: theme.COLORS.BACKGROUND,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: theme.COLORS.BACKGROUND,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => theme.COLORS.TEXT,
    decimalPlaces: 0,
    propsForDots: {
      r: "6",
    },
  };

  return (
    <View
      style={[
        styles.container,
        {
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
