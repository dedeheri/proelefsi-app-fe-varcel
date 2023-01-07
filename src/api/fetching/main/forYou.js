import api from "../../base";
import config from "../../config";

function FORYOU(page) {
  return api.get(`/api/v1/main/article/foryou?page=${page}`, config.headers);
}

export default FORYOU;
