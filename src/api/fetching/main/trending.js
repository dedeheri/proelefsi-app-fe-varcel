import api from "../../base";
import config from "../../config";

function GETTRENDING() {
  return api.get(`/api/v1/main/article/trending`, config.headers);
}

export default GETTRENDING;
