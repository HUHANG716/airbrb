interface UserInfo {
  token: string;
  email: string;
}

interface UserRegisterForm {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}
interface UserLoginForm {
  email: string;
  password: string;
}
interface AuthResponse {
  token: string;
}

export type { UserInfo, UserRegisterForm, UserLoginForm, AuthResponse };
