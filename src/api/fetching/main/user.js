import api from "../../base";
import config from "../../config";

function USER(username) {
  return api.get(`/api/v1/main/user/${username}`, config.headers);
}

export default USER;
