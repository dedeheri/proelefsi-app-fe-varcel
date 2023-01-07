import api from "../base";
import config from "../config";

function CONFIG() {
  return api.get("/api/v1/user/config", config.headers);
}

function PROFILE() {
  return api.get("/api/v1/user", config.headers);
}

function GETUSER(query) {
  return api.get(`/api/v1/user/all${query}`, config.headers);
}

function GETUSERDETAIL(id) {
  return api.get(`/api/v1/user/${id}`, config.headers);
}

function MANAGETOPICUSER(id) {
  return api.get(`/api/v1/user/manage-topics/${id}`, config.headers);
}

function GETARTICLEBYUSERPUBLISHED(id, query) {
  return api.get(
    `/api/v1/user/article/published/${id}${query}`,
    config.headers
  );
}

function GETARTICLEBYUSERDRAFT(id, query) {
  return api.get(`/api/v1/user/article/draft/${id}${query}`, config.headers);
}

function ROLE() {
  return api.get("/api/v1/role", config.headers);
}

function CHANGEROLE(id, role) {
  return api.put(`/api/v1/user/role/${id}`, { role }, config.headers);
}
function VERIFYEMAIL(id, verify) {
  return api.put(`/api/v1/user/verify/${id}`, { verify }, config.headers);
}

function DELETEUSER(id) {
  return api.delete(`/api/v1/user/${id}`, config.headers);
}

function CHANGEPASSWORD(state) {
  return api.put(
    `/api/v1/user/change-password`,
    {
      currentPassword: state.currentPassword,
      newPassword: state.newPassword,
      retypePassword: state.reTypePassword,
    },
    config.headers
  );
}

function CHANGENAME(state) {
  return api.put(
    `/api/v1/user/change-name`,
    {
      fullName: state.fullName,
    },
    config.headers
  );
}

function CHANGEEMAIL(state) {
  return api.post(
    `/api/v1/user/change-email`,
    {
      email: state.email,
    },
    config.headers
  );
}

function CHANGEPHOTO(fromData) {
  return api.put(`/api/v1/user/change-photo`, fromData);
}

function CHANGEBIODATA(state) {
  return api.put(
    `/api/v1/user/change-biodata`,
    {
      biodata: state.bio,
    },
    config.headers
  );
}

export {
  PROFILE,
  GETUSER,
  GETUSERDETAIL,
  MANAGETOPICUSER,
  GETARTICLEBYUSERPUBLISHED,
  GETARTICLEBYUSERDRAFT,
  ROLE,
  CHANGEROLE,
  DELETEUSER,
  VERIFYEMAIL,
  CHANGENAME,
  CHANGEPASSWORD,
  CHANGEEMAIL,
  CHANGEPHOTO,
  CHANGEBIODATA,
  CONFIG,
};
