import toast from "react-hot-toast";
import { ADDROLE, GETROLE } from "../api/fetching/role";
import { getAllCookies } from "../utils/Cookie";

const cookie = getAllCookies();
const baseUrl = process.env.REACT_APP_BASE_URL;

async function requestGetRole(props) {
  try {
    const response = await GETROLE();
    props((prev) => ({
      ...prev,
      loading: false,
      error: false,
      success: true,
      result: response.data.result,
      message: response.data.message,
    }));
  } catch (error) {
    console.log(error);
    props((prev) => ({
      ...prev,
      loading: false,
      error: true,
      success: false,
      result: [],
      message: error.response.data.message,
    }));
  }
}

async function requestAddRole(props, role) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await ADDROLE(role);
    props((prev) => ({
      ...prev,
      fetching: false,
      error: false,
      success: true,
      message: response.data.message,
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
        window.location.href = `${baseUrl}/dashboard/role`;
      }, 3000);
    }
  } catch (error) {
    props((prev) => ({
      ...prev,
      fetching: false,
      error: true,
      success: false,
      message: {
        message: error.response.data.message,
        validation: error.response.data.validation,
      },
    }));
  }
}

export { requestGetRole, requestAddRole };
