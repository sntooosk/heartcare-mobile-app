import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import * as Animatable from "react-native-animatable";
import Header from "../components/Header";
import { useTheme } from "../../context/ThemeContext";
import { commonQuestions } from "../../models/Duvidas";
import shadow from "../../utils/styles";

function Duvidas() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { theme } = useTheme();

  const handleQuestionPress = (id) => {
    setSelectedQuestion(id === selectedQuestion ? null : id);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}
    >
      <Header title="Dúvidas"/>
      <View style={{ backgroundColor: theme.COLORS.BACKGROUND }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {commonQuestions.map((item) => (
            <Animatable.View
              key={item.id}
              animation="fadeInUp"
              style={[
                styles.questionContainer,
                {
                  backgroundColor: theme.COLORS.BACKGROUND_CARD,
                  ...shadow.shadowOverlay,
                },
              ]}
            >
              <TouchableOpacity onPress={() => handleQuestionPress(item.id)}>
                <View
                  style={[
                    styles.questionHeader,
                    { backgroundColor: theme.COLORS.BACKGROUND_CARD },
                  ]}
                >
                  <MaterialIcons
                    name={
                      selectedQuestion === item.id
                        ? "keyboard-arrow-up"
                        : "keyboard-arrow-down"
                    }
                    size={24}
                    color={theme.COLORS.TITLE}
                  />
                  <Text
                    style={[styles.questionText, { color: theme.COLORS.TITLE }]}
                  >
                    {item.pergunta}
                  </Text>
                </View>
              </TouchableOpacity>
              {selectedQuestion === item.id && (
                <Animatable.Text
                  animation="fadeIn"
                  style={[styles.answerText, { color: theme.COLORS.CONTENT }]}
                >
                  {item.resposta}
                </Animatable.Text>
              )}
            </Animatable.View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default Duvidas;
