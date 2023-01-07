import toast from "react-hot-toast";
import { ADDFEEDBACK } from "../api/fetching/feedback";
import { getAllCookies } from "../utils/Cookie";

const cookie = getAllCookies();

async function requestAddFeedback(props, feedback) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await ADDFEEDBACK(feedback);
    props((prev) => ({
      ...prev,
      error: false,
      fetching: false,
      success: true,
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
        window.location.reload();
      }, 3000);
    }
  } catch (error) {
    if (error.response.status === 500) {
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
      error: true,
      fetching: false,
      message: error.response.data.validation,
    }));
  }
}

export { requestAddFeedback };
