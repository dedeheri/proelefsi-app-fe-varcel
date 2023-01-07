import api from "../base";
import config from "../config";

function TOPICS(query) {
  return api.get(`/api/v1/topics${query}`, config.headers);
}

function ADDTOPICS(topics, description) {
  return api.post(
    `/api/v1/topics/add`,
    {
      topics,
      description,
    },
    config.headers
  );
}

function EDITTOPICS(id, topics, description) {
  return api.put(
    `/api/v1/topics/${id}`,
    {
      topics,
      description,
    },
    config.headers
  );
}

function DETAILTOPICS(id) {
  return api.get(`/api/v1/topics/${id}`, config.headers);
}

function DELETEDTOPICS(id) {
  return api.delete(`/api/v1/topics/${id}`, config.headers);
}

export { TOPICS, ADDTOPICS, DETAILTOPICS, EDITTOPICS, DELETEDTOPICS };
