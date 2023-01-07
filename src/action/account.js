import toast from "react-hot-toast";
import {
  SIGNUP,
  SIGNIN,
  OTPSEND,
  OTPRESEND,
  FORGETPASSWORD,
  RESETPASSWORD,
  VERIFYTOKEN,
  HISTORYLOGIN,
} from "../api/fetching";
import { DELETEUSER } from "../api/fetching/user";
import { getAllCookies } from "../utils/Cookie";

const cookie = getAllCookies();
const baseUrl = process.env.REACT_APP_BASE_URL;

async function requestSignUp(props, data) {
  try {
    props((prev) => ({
      ...prev,
      fetching: true,
    }));
    const response = await SIGNUP(data);
    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        success: response.data,
      },
    }));

    if (response.status === 200) {
      setInterval(() => {
        window.location.href = `${baseUrl}/account`;
      }, 3000);
    }

    toast.success(response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
  } catch (error) {
    if (error.status === 500) {
      toast.error(error.response.data.error, {
        style: {
          borderRadius: "10px",
          padding: "10px",
          background: cookie.theme === "dark" ? "#353535" : "#fff",
          color: cookie.theme === "dark" ? "#fff" : "#000",
        },
      });
    }
    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        validation: error.response.data.validation,
        error: error.response.data.message || error.response.data.error,
      },
    }));
  }
}

async function requestSignIn(props, data) {
  try {
    props((prev) => ({
      ...prev,
      fetching: true,
    }));
    const response = await SIGNIN(data);
    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        success: response.data,
      },
    }));

    toast.success(response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });

    if (response.status === 200) {
      setInterval(() => {
        window.location.href = `${baseUrl}/account/otp`;
      }, 4000);
    }
  } catch (error) {
    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        validation: error.response.data.validation,
        error: error.response.data.message,
      },
    }));

    toast.error(error.response.data.error.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
  }
}

async function requestSendOTP(props, otp) {
  try {
    props((prev) => ({
      ...prev,
      fetching: true,
    }));
    const response = await OTPSEND(otp);
    props((prev) => ({
      ...prev,
      fetching: false,
      users: response.data.users,
      message: {
        success: response.data.message,
      },
    }));

    toast.success(response.data.message.OTP, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });

    if (response.status === 200) {
      setInterval(() => {
        window.location.href = `${baseUrl}/dashboard`;
      }, 4000);
    }
  } catch (error) {
    if (error.response.status === 500) {
      toast.error(
        error?.response?.data?.error || error?.response?.data?.message?.OTP,
        {
          style: {
            borderRadius: "10px",
            padding: "10px",
            background: cookie.theme === "dark" ? "#353535" : "#fff",
            color: cookie.theme === "dark" ? "#fff" : "#000",
          },
        }
      );
    }

    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        validation: error?.response?.data?.validation,
        error:
          error?.response?.data?.message?.OTP || error?.response?.data?.error,
      },
    }));
  }
}

async function requestReSendOTP(props) {
  try {
    props((prev) => ({
      ...prev,
      fetching: true,
    }));
    const response = await OTPRESEND();
    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        success: response.data.message,
      },
    }));

    toast.success(response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
  } catch (error) {
    props((prev) => ({
      ...prev,
      fetching: false,
    }));

    toast.error(error?.response?.data?.error, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
  }
}

async function requestForgetPassword(props, email) {
  try {
    props((prev) => ({
      ...prev,
      fetching: true,
    }));
    const response = await FORGETPASSWORD(email);
    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        success: response.data.message,
      },
    }));

    toast.success(response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
  } catch (error) {
    if (error.response.status === 500) {
      toast.error(error?.response?.data?.error, {
        style: {
          borderRadius: "10px",
          padding: "10px",
          background: cookie.theme === "dark" ? "#353535" : "#fff",
          color: cookie.theme === "dark" ? "#fff" : "#000",
        },
      });
    }

    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        validation: error?.response?.data?.validation,
        error: error?.response?.data?.message,
      },
    }));
  }
}

async function requestVerifyToken(props, token) {
  try {
    await VERIFYTOKEN(token);
    props((prev) => ({
      ...prev,
      loading: false,
    }));
  } catch (error) {
    props((prev) => ({
      ...prev,
      loading: false,
      error: true,
      message: error?.response?.data?.message || error?.response?.data?.error,
    }));
  }
}

async function requestResetPassword(props, token, state) {
  try {
    props((prev) => ({
      ...prev,
      fetching: true,
    }));
    const response = await RESETPASSWORD(token, state);
    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        success: response.data.message,
      },
    }));
  } catch (error) {
    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        validation: error?.response?.data?.validation,
        error: error?.response?.data?.message,
      },
    }));
  }
}

async function requestDeleteUser(props, id) {
  try {
    props((prev) => ({
      ...prev,
      fetching: true,
    }));
    const response = await DELETEUSER(id);

    toast.success(response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });

    setInterval(() => {
      window.location.reload();
      props((prev) => ({
        ...prev,
        fetching: false,
        message: response.data.message,
        show: false,
      }));
    }, [3000]);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
    props((prev) => ({
      ...prev,
      fetching: false,
      show: true,
      message: error?.response?.data?.message,
    }));
  }
}

async function requestGetHistoryLogin(props) {
  try {
    const response = await HISTORYLOGIN();
    props((prev) => ({
      ...prev,
      loading: false,
      success: true,
      message: response.data.message,
      data: response.data.user,
    }));
  } catch (error) {
    console.log(error);
    props((prev) => ({
      ...prev,
      loading: false,
      error: true,
      message: error.response.data.message,
    }));
  }
}

export {
  requestSignUp,
  requestSignIn,
  requestSendOTP,
  requestReSendOTP,
  requestForgetPassword,
  requestResetPassword,
  requestVerifyToken,
  requestDeleteUser,
  requestGetHistoryLogin,
};
