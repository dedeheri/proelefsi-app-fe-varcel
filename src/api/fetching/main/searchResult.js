import api from "../../base";
import config from "../../config";

function SEARCHRESULT(query) {
  return api.get(`/api/v1/main/search${query}`, config.headers);
}

export default SEARCHRESULT;
