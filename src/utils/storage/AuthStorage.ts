import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncSetUser = async (chave: any) =>
  await AsyncStorage.setItem("heartcare@user", JSON.stringify(chave));

export const asyncGetUser = async () => {
  const data = await AsyncStorage.getItem("heartcare@user");
  const response: any = data ? JSON.parse(data) : null;

  return response;
};

export const asyncRemoveUser = async () => {
  await AsyncStorage.removeItem("heartcare@user");
};

export const asyncGetUserToken = async () => {
  const userData = await asyncGetUser();
  return userData ? userData.token : null;
};
