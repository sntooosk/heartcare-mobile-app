import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsNavigationStack = {
  Home: undefined | any;
  SignIn: undefined | any;
  SignUp: undefined | any;
  ResetPassword: undefined | any;

  Feed: undefined | any;
  MedicationInfo: undefined | any;
  Profile: undefined | any;
  PressureInfo: undefined | any;
};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
