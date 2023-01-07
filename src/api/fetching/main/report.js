import api from "../../base";
import config from "../../config";

function REPORTARTICLE(problem, comments, id) {
  return api.post(
    `/api/v1/main/article/report`,
    { problem, comments, articleId: id },
    config.headers
  );
}

export default REPORTARTICLE;
