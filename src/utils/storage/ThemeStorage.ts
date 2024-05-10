import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncGetTheme = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("heartcare@theme");
  } catch (error) {
    console.error("Error getting theme from AsyncStorage:", error);
    return null;
  }
};

export const asyncSetTheme = async (theme: string): Promise<void> => {
  try {
    await AsyncStorage.setItem("heartcare@theme", theme);
  } catch (error) {
    console.error("Error setting theme to AsyncStorage:", error);
  }
};
