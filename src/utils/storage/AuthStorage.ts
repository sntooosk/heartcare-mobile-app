import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncSetUser = async (chave: any) =>
  await AsyncStorage.setItem("loginapp@user", JSON.stringify(chave));

export const asyncGetUser = async () => {
  const data = await AsyncStorage.getItem("loginapp@user");
  const response: any = data ? JSON.parse(data) : null;

  return response;
};

export const asyncRemoveUser = async () => {
  await AsyncStorage.removeItem("loginapp@user");
};
