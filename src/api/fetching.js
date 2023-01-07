import api from "./base";
import config from "./config";

function SIGNUP(data) {
  return api.post("/api/v1/auth/signup", data);
}

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

function OTPSEND(otp) {
  return api.post(
    "/api/v1/auth/otp",
    {
      otp: otp,
    },
    config.headers
  );
}

function OTPRESEND() {
  return api.get("/api/v1/auth/otp/resend", config.headers);
}

function FORGETPASSWORD(email) {
  return api.post(
    "/api/v1/auth/password/forget",
    {
      email,
    },
    config.headers
  );
}

function RESETPASSWORD(token, state) {
  return api.post(
    `/api/v1/auth/password/change/${token}`,
    {
      password: state.password,
      repeatPassword: state.repeatPassword,
    },
    config.headers
  );
}

function VERIFYTOKEN(token) {
  return api.get(`/api/v1/auth/password/verify${token}`, config.headers);
}

function HOME() {
  return api.get("/api/v1/home");
}

function HISTORYLOGIN() {
  return api.get("/api/v1/user/auth/history-login");
}

export {
  SIGNUP,
  SIGNIN,
  OTPSEND,
  OTPRESEND,
  FORGETPASSWORD,
  RESETPASSWORD,
  VERIFYTOKEN,
  HOME,
  HISTORYLOGIN,
};
