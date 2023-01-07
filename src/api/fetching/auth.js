import api from "../base";
import config from "../config";

function VERIFYEMAILACCOUNT(id, verify) {
  return api.put(
    `/api/v1/auth/account/verify-email/${id}`,
    { verify },
    config.headers
  );
}

function DELETEACCOUNT(id) {
  return api.delete(`/api/v1/auth/account/${id}`, config.headers);
}

export { VERIFYEMAILACCOUNT, DELETEACCOUNT };
