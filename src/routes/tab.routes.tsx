import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { StatusBar } from "react-native";
import { themes } from "../utils/styles/colors";
import { propsNavigationStack } from "./types";
import FAQ from "../screens/FAQ";
import Profile from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator<propsNavigationStack>();

export default function TabRoutes() {
  return (
    <>
      <StatusBar
        backgroundColor={themes.COLORS.PRIMARY}
        barStyle="light-content"
      />
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: themes.COLORS.BACKGROUND,
          },
        }}
      >
        <Screen
          name="FAQ"
          component={FAQ}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="info"
                size={focused ? size + 5 : size}
                color={focused ? themes.COLORS.PRIMARY : themes.COLORS.TITLE}
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
                size={focused ? size + 5 : size}
                color={focused ? themes.COLORS.PRIMARY : themes.COLORS.TITLE}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
      </Navigator>
    </>
  );
}
