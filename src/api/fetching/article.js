import api from "../base";
import config from "../config";

function GETARTICLE(query) {
  return api.get(`/api/v1/article${query}`, config.headers);
}

function GETARTICLEANALYSIS(id) {
  return api.get(`/api/v1/article/${id}/analysis`, config.headers);
}

function GETDETAILARTICLE(id) {
  return api.get(`/api/v1/article/${id}`, config.headers);
}

function ADDARTICLE(fromData) {
  return api.post(`/api/v1/article/add`, fromData, config.headers);
}

function UPDATEARTICLE(id, fromData) {
  return api.put(`/api/v1/article/${id}`, fromData, config.headers);
}

function ADDARTICLEIMAGETEMP(fromData) {
  return api.post(`/api/v1/article/image_temp`, fromData, config.headers);
}

function DELETEDARTICLE(id) {
  return api.delete(`/api/v1/article/${id}`, config.headers);
}
function CHANGEDRAFTARTICLE(id, change) {
  return api.put(
    `/api/v1/article/change/${id}`,
    { draft: change },
    config.headers
  );
}

export {
  GETARTICLE,
  DELETEDARTICLE,
  ADDARTICLE,
  ADDARTICLEIMAGETEMP,
  GETDETAILARTICLE,
  UPDATEARTICLE,
  CHANGEDRAFTARTICLE,
  GETARTICLEANALYSIS,
};
