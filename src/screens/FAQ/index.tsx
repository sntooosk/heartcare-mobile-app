import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import * as Animatable from "react-native-animatable";
import Header from "../components/Header";
import { useTheme } from "../../context/ThemeContext";

export default function FAQ() {
  const [benefits] = useState([
    {
      id: 1,
      title: "Melhora da saúde cardiovascular",
      description:
        "A corrida fortalece o coração, melhora a circulação sanguínea e ajuda a reduzir o risco de doenças cardíacas.",
    },
    {
      id: 2,
      title: "Aumento da resistência física",
      description:
        "Correr regularmente aumenta a resistência física e melhora a capacidade pulmonar.",
    },
    {
      id: 3,
      title: "Redução do estresse e ansiedade",
      description:
        "A corrida libera endorfinas, neurotransmissores que proporcionam sensação de bem-estar, ajudando a reduzir o estresse e a ansiedade.",
    },
    {
      id: 4,
      title: "Controle do peso",
      description:
        "A prática regular de corrida ajuda na queima de calorias e no controle do peso corporal.",
    },
    {
      id: 5,
      title: "Fortalecimento muscular",
      description:
        "A corrida trabalha diversos grupos musculares, promovendo o fortalecimento e tonificação do corpo.",
    },
  ]);

  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const { theme } = useTheme();

  const handleBenefitPress = (id) => {
    setSelectedBenefit(id === selectedBenefit ? null : id);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.COLORS.BACKGROUND,
        },
      ]}
    >
      <View>
        <Header theme={theme} title="FAQ" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {benefits.map((item) => (
          <Animatable.View
            key={item.id}
            animation="fadeInUp"
            style={[
              styles.benefitContainer,
              {
                backgroundColor: theme.COLORS.BACKGROUND_CARD,
              },
            ]}
          >
            <TouchableOpacity onPress={() => handleBenefitPress(item.id)}>
              <View
                style={[
                  styles.benefitHeader,
                  {
                    backgroundColor: theme.COLORS.BACKGROUND_CARD,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.benefitTitle,
                    {
                      color: theme.COLORS.TITLE,
                    },
                  ]}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
            {selectedBenefit === item.id && (
              <Animatable.Text
                animation="fadeIn"
                style={[
                  styles.benefitDescription,
                  {
                    color: theme.COLORS.CONTENT,
                  },
                ]}
              >
                {item.description}
              </Animatable.Text>
            )}
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
}
