import api from "../base";
import config from "../config";

function ADDFEEDBACK(feedback) {
  return api.post(`/api/v1/feedback/add`, { feedback }, config.headers);
}

export { ADDFEEDBACK };
