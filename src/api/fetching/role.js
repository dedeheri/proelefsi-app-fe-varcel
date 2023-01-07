import api from "../base";
import config from "../config";

function GETROLE() {
  return api.get("/api/v1/role", config.headers);
}

function ADDROLE(role) {
  return api.post(`/api/v1/role/add`, { role }, config.headers);
}

export { GETROLE, ADDROLE };
