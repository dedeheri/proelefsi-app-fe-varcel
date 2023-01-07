import api from "../../base";
import config from "../../config";

function ARTILCEBYUSER(username) {
  return api.get(`/api/v1/main/article/user/${username}`, config.headers);
}

export default ARTILCEBYUSER;
