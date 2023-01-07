import {
  ADDARTICLE,
  DELETEDARTICLE,
  GETARTICLE,
  GETARTICLEANALYSIS,
  GETDETAILARTICLE,
  UPDATEARTICLE,
} from "../../../api/fetching/article";
import toaster from "../../../utils/toaster";
import * as actionType from "../../actiontypes/dashboard";

const baseUrl = process.env.REACT_APP_BASE_URL;

function getArticleAction(query) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.FETCHING_GET_ALL_ARTICLE });
      const response = await GETARTICLE(query);
      dispatch({
        type: actionType.SUCCESS_GET_ALL_ARTICLE,
        data: response.data.data,
        message: response.data.message,
        page: response.data.page,
      });
    } catch (error) {
      console.clear();
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_GET_ALL_ARTICLE,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_GET_ALL_ARTICLE,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

function deleteArticleAction(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.FETCHING_DELETE_ARTICLE });
      const response = await DELETEDARTICLE(id);
      dispatch({
        type: actionType.SUCCESS_DELETE_ARTICLE,
        message: response.data.message,
      });
      toaster("success", response.data.message);
      if (response.status === 200) {
        setInterval(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message, {
      //   style: {
      //     borderRadius: "10px",
      //     padding: "10px",
      //     background: cookie.theme === "dark" ? "#353535" : "#fff",
      //     color: cookie.theme === "dark" ? "#fff" : "#000",
      //   },
      // });
      // props((prev) => ({
      //   ...prev,
      //   success: true,
      //   fetching: false,
      //   message: error.response.data.message,
      // }));
    }
  };
}

function analysisArticleAction(id) {
  return async function (dispatch) {
    try {
      const response = await GETARTICLEANALYSIS(id);
      dispatch({
        type: actionType.SUCCESS_ARTICLE_ANALYSIS,
        message: response.data.message,
        data: response.data.result,
      });
    } catch (error) {
      console.clear();
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_ARTICLE_ANALYSIS,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_ARTICLE_ANALYSIS,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

function detailArticleAction(id) {
  return async function (dispatch) {
    try {
      const response = await GETDETAILARTICLE(id);
      dispatch({
        type: actionType.SUCCESS_DETAIL_ARTICLE,
        result: response.data.data,
        message: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: actionType.FAILED_DETAIL_ARTICLE,
        message: error.response.data.message,
      });
    }
  };
}

function addArticeAction(data) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.FETCHING_ADD_ARTICLE });
      const response = await ADDARTICLE(data);

      dispatch({
        type: actionType.SUCCESS_ADD_ARTICLE,
        message: response.data.message,
      });

      if (response.status === 200) {
        setInterval(() => {
          window.location.href = `${baseUrl}/dashboard/article`;
        }, 3000);
      }
      toaster("success", response.data.message);
    } catch (error) {
      if (error.response.status === 500) {
        toaster("error", error.response.data.error);
      }
      dispatch({
        type: actionType.FAILED_ADD_ARTICLE,
        form_validation: error.response.data.validation,
        message: error.response.data?.message,
      });
    }
  };
}

function editArticleAction(id, formData) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.FETCHING_EDIT_ARTICLE });
      const response = await UPDATEARTICLE(id, formData);
      toaster("success", response.data.message);
      if (response.status === 200) {
        setInterval(() => {
          window.location.href = `${baseUrl}/dashboard/article`;
        }, 3000);
      }
      dispatch({
        type: actionType.SUCCESS_EDIT_ARTICLE,
        message: response.data.message,
      });
    } catch (error) {
      if (error.response.status === 500) {
        toaster("error", error.response.data.error);
      }
      dispatch({
        type: actionType.FAILED_EDIT_ARTICLE,
        message: error.response.data.error,
        form_validation: error.response.data.validation,
      });
    }
  };
}

export {
  getArticleAction,
  deleteArticleAction,
  analysisArticleAction,
  detailArticleAction,
  addArticeAction,
  editArticleAction,
};
