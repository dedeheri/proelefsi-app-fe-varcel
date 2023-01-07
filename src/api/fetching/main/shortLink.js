import api from "../../base";
import config from "../../config";

function SHORTLINK(id) {
  return api.get(`/api/v1/main/article/shortlink/${id}`, config.headers);
}

export default SHORTLINK;
