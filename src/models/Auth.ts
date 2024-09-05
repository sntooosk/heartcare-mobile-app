import User from "./User";

interface Auth {
  id: number;
  token: string;
  email: string;
  password: string;
  role: string;
  User: User;
}

export default Auth;
