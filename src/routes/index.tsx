import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import SplashScreen from "../screens/components/SplashScreen";
import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";

export default function Router() {
  const { authData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => setIsLoading(false);

  useEffect(() => {
    const timer = setTimeout(finishLoading, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer independent={true}>
      {isLoading ? (
        <SplashScreen />
      ) : authData ? (
        <TabRoutes />
      ) : (
        <StackRoutes />
      )}
    </NavigationContainer>
  );
}
