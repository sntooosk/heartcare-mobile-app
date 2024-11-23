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
    LOW: string;
    NORMAL: string;
    PRE_HYPERTENSION: string;
    HYPERTENSION1: string;
    HYPERTENSION2: string;
    ALERT: string;
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
      LOW: "#1E90FF",
      NORMAL: "#32CD32",
      PRE_HYPERTENSION: "#FFA500",
      HYPERTENSION1: "#FF4500",
      HYPERTENSION2: "#8B0000",
      ALERT: "#FFD700",
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
      LOW: "#1E90FF",
      NORMAL: "#32CD32",
      PRE_HYPERTENSION: "#FFA500",
      HYPERTENSION1: "#FF4500",
      HYPERTENSION2: "#8B0000",
      ALERT: "#FFD700",
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
