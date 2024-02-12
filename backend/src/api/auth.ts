type User = {
  email: string;
  password: string;
  role: string;
  id: string;
}

type SignupDto = {
  email: string;
  password: string;
};

type SigninDto = {
  email: string;
  password: string;
};

type LoginResponse = {
  sub: string; // user id
  access_token: string; // JWT
};