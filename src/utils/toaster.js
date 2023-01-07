import { toast } from "react-hot-toast";
import { getAllCookies } from "./Cookie";

const cookie = getAllCookies();

function toaster(type, message) {
  if (type === "error") {
    toast.error(message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
  } else {
    toast.success(message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
  }
}

export default toaster;
