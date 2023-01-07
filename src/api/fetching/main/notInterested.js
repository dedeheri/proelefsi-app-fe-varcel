import api from "../../base";
import config from "../../config";

function NOTINTERESTED(id) {
  return api.post(
    `/api/v1/main/article/not-interested`,
    { articleId: id },
    config.headers
  );
}

export default NOTINTERESTED;
