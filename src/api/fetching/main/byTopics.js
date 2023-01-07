import api from "../../base";
import config from "../../config";

function GETARTICLEBYTOPICS(topics) {
  return api.get(`/api/v1/main/topics/${topics}`, config.headers);
}

export default GETARTICLEBYTOPICS;
