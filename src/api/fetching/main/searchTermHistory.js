import api from "../../base";
import config from "../../config";

function SEARCHTERMHISOTRY() {
  return api.get(`/api/v1/main/search/term/history`, config.headers);
}

export default SEARCHTERMHISOTRY;
