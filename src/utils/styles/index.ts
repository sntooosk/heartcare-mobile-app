import { StyleSheet } from "react-native";

export interface Theme {
  COLORS: {
    BACKGROUND_CARD: string;
    BACKGROUND: string;
    BUTTON: string;
    BUTTON_TEXT: string;
    TEXT: string;
    ICON: string;
    PRIMARY: string;
    WHITE: string;
    TITLE: string;
    CONTENT: string;
    OVERLAY: string;
    CHART_LINE: string;
    CHART_FILL: string;
    CHART_GRID: string;
  };
}

export const themes: { light: Theme; dark: Theme } = {
  light: {
    COLORS: {
      BACKGROUND_CARD: "#F0F2F5",
      BACKGROUND: "#E4E6EF",
      BUTTON: "#f63e6b",
      BUTTON_TEXT: "#FFF",
      TEXT: "#000",
      ICON: "#333",
      PRIMARY: "#f5295a",
      WHITE: "#FFF",
      TITLE: "#333",
      CONTENT: "#555",
      OVERLAY: "rgba(0,0,0,0.6)",
      CHART_LINE: "#f5295a", // Linha rosa suave para o gráfico
      CHART_FILL: "rgba(244,143,177,0.2)", // Preenchimento leve rosa
      CHART_GRID: "#FDE2E4", // Grade clara em tom rosa
    },
  },
  dark: {
    COLORS: {
      BACKGROUND_CARD: "#222",
      BACKGROUND: "#000",
      BUTTON: "#f63e6b",
      BUTTON_TEXT: "#FFF",
      TEXT: "#FFF",
      ICON: "#FFF",
      PRIMARY: "#f5295a",
      WHITE: "#FFF",
      TITLE: "#FFF",
      CONTENT: "#DDD",
      OVERLAY: "rgba(0,0,0,0.8)",
      CHART_LINE: "#F06292", // Rosa mais vibrante para o gráfico
      CHART_FILL: "rgba(240,98,146,0.2)", // Preenchimento suave vibrante
      CHART_GRID: "#880E4F", // Grade em tom de rosa escuro
    },
  },
};

const shadow = StyleSheet.create({
  shadowOverlay: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default shadow;

