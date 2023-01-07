import toast from "react-hot-toast";

import {
  DELETEDARTICLE,
  GETARTICLE,
  ADDARTICLE,
  GETDETAILARTICLE,
  UPDATEARTICLE,
  CHANGEDRAFTARTICLE,
} from "../api/fetching/article";
import { getAllCookies } from "../utils/Cookie";

const cookie = getAllCookies();

const baseUrl = process.env.REACT_APP_BASE_URL;

async function requestGetArticle(props, query) {
  try {
    props((prev) => ({ ...prev, loading: true }));
    const response = await GETARTICLE(query);
    props((prev) => ({
      ...prev,
      loading: false,
      success: true,
      error: false,
      message: response.data.message,
      data: {
        article: response.data.data,
        page: response.data.page,
      },
    }));
  } catch (error) {
    props((prev) => ({
      ...prev,
      loading: false,
      success: false,
      error: true,
      message: error.response.data.message,
      data: {
        article: [],
        page: [],
      },
    }));
  }
}

async function requestGetDetailArticle(props, query) {
  try {
    const response = await GETDETAILARTICLE(query);
    props((prev) => ({
      ...prev,
      loading: false,
      success: true,
      error: false,
      message: response.data.message,
      data: response.data.data,
    }));
  } catch (error) {
    props((prev) => ({
      ...prev,
      loading: false,
      success: false,
      error: true,
      message: error.response.data.message,
    }));
  }
}

async function requestAddArticle(props, formData) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await ADDARTICLE(formData);
    props((prev) => ({
      ...prev,
      error: false,
      fetching: false,
      success: true,
      message: {
        validation: {},
        error_message: {},
      },
    }));
    toast.success(response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });

    // if (response.status === 200) {
    //   setInterval(() => {
    //     window.location.href = `${baseUrl}/dashboard/article`;
    //   }, 3000);
    // }
  } catch (error) {
    if (error.response.status === 500) {
      toast.error(error.response.data.error, {
        style: {
          borderRadius: "10px",
          padding: "10px",
          background: cookie.theme === "dark" ? "#353535" : "#fff",
          color: cookie.theme === "dark" ? "#fff" : "#000",
        },
      });
    }

    props((prev) => ({
      ...prev,
      error: true,
      fetching: false,
      message: {
        validation: error.response.data.validation,
        error_message: error.response.data.message,
      },
    }));
  }
}

async function requestUpdateArticle(props, id, formData) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await UPDATEARTICLE(id, formData);
    console.log(response);
    props((prev) => ({
      ...prev,
      error: false,
      fetching: false,
      success: true,
      message: {
        validation: {},
        error_message: {},
      },
    }));

    toast.success(response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });

    if (response.status === 200) {
      setInterval(() => {
        window.location.href = "http://localhost:3000/dashboard/article";
      }, 3000);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });

    props((prev) => ({
      ...prev,
      error: true,
      fetching: false,
      message: {
        validation: error.response.data.validation,
        error_message: error.response.data.message,
      },
    }));
  }
}

async function requestDeletedArticle(props, id) {
  try {
    props((prev) => ({
      ...prev,
      fetching: true,
    }));
    const response = await DELETEDARTICLE(id);
    props((prev) => ({
      ...prev,
      success: true,
      fetching: false,
      message: response.data.message,
    }));
    toast.success(response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
    if (response.status === 200) {
      setInterval(() => {
        window.location.reload();
      }, 3000);
    }
  } catch (error) {
    toast.error(error.response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
    props((prev) => ({
      ...prev,
      success: true,
      fetching: false,
      message: error.response.data.message,
    }));
  }
}

async function requestChangeArticle(props, id, change) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await CHANGEDRAFTARTICLE(id, change);
    console.log(response);
    props((prev) => ({
      ...prev,
      error: false,
      fetching: false,
      success: true,
      message: response.data.message,
    }));

    toast.success(response.data.message, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });
  } catch (error) {
    toast.error(error.response.data.error, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });

    props((prev) => ({
      ...prev,
      error: true,
      fetching: false,
      message: error.response.data.message,
    }));
  }
}

export {
  requestGetArticle,
  requestDeletedArticle,
  requestAddArticle,
  requestGetDetailArticle,
  requestUpdateArticle,
  requestChangeArticle,
};
