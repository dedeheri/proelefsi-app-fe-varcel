import api from "../../base";
import config from "../../config";

function SEARCHTERM(q) {
  return api.post(`/api/v1/main/search/term`, { q }, config.headers);
}

export default SEARCHTERM;
