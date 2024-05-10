import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { propsNavigationStack } from "./types";
import Home from "../screens/Home";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";

const { Screen, Navigator } =
  createNativeStackNavigator<propsNavigationStack>();

export default function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} options={{ headerShown: false }} />

      <Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Navigator>
  );
}
