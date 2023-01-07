import api from "../base";
import config from "../config";

function HOME() {
  return api.get("/api/v1/home", config.headers);
}

function ACTIVITYARTICLE() {
  return api.get("/api/v1/home/new", config.headers);
}
export { HOME, ACTIVITYARTICLE };
