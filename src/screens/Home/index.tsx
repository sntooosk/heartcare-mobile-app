import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { propsStack } from "../../routes/types";
import { themes } from "../../utils/styles/colors";

import MainIllustrationSvg from "../../assets/svg/main-illustration.svg";

function Home() {
  const { navigate } = useNavigation<propsStack>();

  return (
    <View
      style={[styles.container, { backgroundColor: themes.COLORS.PRIMARY }]}
    >
      <Animatable.View delay={600} animation="slideInLeft">
        <MainIllustrationSvg width={400} height={400} />
      </Animatable.View>
      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={[
          styles.containerForm,
          { backgroundColor: themes.COLORS.BACKGROUND },
        ]}
      >
        <Text style={[styles.title, { color: themes.COLORS.TITLE }]}>
          You should Movelt!
        </Text>
        <Text style={[styles.text, { color: themes.COLORS.TITLE }]}>
          Log in to your account
        </Text>

        <TouchableOpacity
          style={[
            styles.buttonAcessar,
            { backgroundColor: themes.COLORS.BUTTON },
          ]}
          onPress={() => navigate("SignIn")}
        >
          <Text
            style={[styles.buttonText, { color: themes.COLORS.BUTTON_TEXT }]}
          >
            Access
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

export default Home;
