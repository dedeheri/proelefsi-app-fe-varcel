import api from "../../base";
import config from "../../config";

function GETTOPICS() {
  return api.get(`/api/v1/main/topics`, config.headers);
}

export { GETTOPICS };
