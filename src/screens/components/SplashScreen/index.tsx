import React, { useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions, Image, Text } from "react-native";
import { useTheme } from "../../../context/ThemeContext";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  const expandAnimation = React.useRef(new Animated.Value(0)).current;
  const logoPosition = React.useRef(new Animated.Value(0)).current;
  const cardOpacity = React.useRef(new Animated.Value(0)).current;
  const formOpacity = React.useRef(new Animated.Value(0)).current;

  const { theme } = useTheme();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(expandAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(logoPosition, {
        toValue: -height / 3.2 + 40,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [expandAnimation, logoPosition, cardOpacity, formOpacity]);

  const expandSize = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [width * 0.8, width * 2.5],
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.BACKGROUND }]}>
      <Animated.View
        style={[
          styles.whitePart,
          {
            backgroundColor: "#1F2937",
            width: expandSize,
            height: expandSize,
          },
        ]}
      >
        <Animated.Image
          source={require("../../../../assets/icon.png")}
          style={[
            styles.logo,
            {
              transform: [{ translateY: logoPosition }],
            },
          ]}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View style={[styles.card, { opacity: cardOpacity, backgroundColor: "1F2937/" }]}>
        <Animated.View style={{ opacity: formOpacity }}>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whitePart: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
  },
  logo: {
    width: width * 0.5,
    height: height * 0.5,
  },
  card: {
    position: "absolute",
    bottom: height / 4,
    width: "80%",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
});

export default SplashScreen;
