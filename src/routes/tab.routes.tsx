import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { propsNavigationStack } from "./types";
import Profile from "../screens/Profile";
import { useTheme } from "../context/ThemeContext";
import shadow from "../utils/styles";
import Feed from "../screens/Feed";
import PressureInfo from "../screens/PressureInfo";
import MedicationInfo from "../screens/MedicationInfo";

const { Navigator, Screen } = createBottomTabNavigator<propsNavigationStack>();

export default function TabRoutes() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar backgroundColor={"#1F2937"} barStyle="light-content" />
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.COLORS.BACKGROUND,
            position: "absolute",
            borderTopColor: theme.COLORS.PRIMARY,
            padding: 20,
            bottom: 26,
            left: 26,
            right: 26,
            elevation: 0,
            borderRadius: 30,
            borderWidth: 2.6,
            borderColor: theme.COLORS.PRIMARY,
            height: 80,
            ...shadow.shadowOverlay,
          },
        }}
      >
        <Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="heart"
                size={focused ? size + 6 : size}
                color={focused ? theme.COLORS.PRIMARY : theme.COLORS.TITLE}
              />
            ),
            tabBarLabel: () => null,
          }}
        />

        <Screen
          name="MedicationInfo"
          component={MedicationInfo}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <MaterialIcons
                name="medication"
                size={focused ? size + 6 : size}
                color={focused ? theme.COLORS.PRIMARY : theme.COLORS.TITLE}
              />
            ),
            tabBarLabel: () => null,
          }}
        />

        <Screen
          name="PressureInfo"
          component={PressureInfo}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="activity"
                size={focused ? size + 6 : size}
                color={focused ? theme.COLORS.PRIMARY : theme.COLORS.TITLE}
              />
            ),
            tabBarLabel: () => null,
          }}
        />

        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="user"
                size={focused ? size + 10 : size}
                color={focused ? theme.COLORS.PRIMARY : theme.COLORS.TITLE}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
      </Navigator>
    </>
  );
}
