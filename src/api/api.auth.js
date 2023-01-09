import api from "./base";
import config from "./config";

function SIGNIN(data) {
  return api.post(
    "/api/v1/auth/signin",
    {
      email: data.email,
      password: data.password,
      remember_me: data.remember_me,
    },
    config.headers
  );
}

export { SIGNIN };
