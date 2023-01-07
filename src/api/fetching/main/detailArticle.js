import api from "../../base";
import config from "../../config";

function DETAILARTICLE(id) {
  return api.get(`/api/v1/main/article/${id}`, config.headers);
}

export default DETAILARTICLE;
