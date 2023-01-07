import toast from "react-hot-toast";
import {
  CHANGEROLE,
  GETARTICLEBYUSERDRAFT,
  GETARTICLEBYUSERPUBLISHED,
  GETUSERDETAIL,
  MANAGETOPICUSER,
  PROFILE,
  CHANGENAME,
  CHANGEPASSWORD,
  CHANGEEMAIL,
  CHANGEPHOTO,
  CHANGEBIODATA,
} from "../api/fetching/user";
import { getAllCookies } from "../utils/Cookie";

const cookie = getAllCookies();

async function requestProfile(props) {
  try {
    const response = await PROFILE();
    props((prev) => ({
      ...prev,
      loading: false,
      error: false,
      success: true,
      message: response.data.message,
      user: response.data.user,
    }));
  } catch (error) {
    props((prev) => ({
      ...prev,
      loading: false,
      error: true,
      message: error.response?.data?.message || error?.response?.data?.error,
    }));
  }
}

async function requestGetUserDetail(props, id) {
  try {
    const response = await GETUSERDETAIL(id);
    props((prev) => ({
      ...prev,
      loading: false,
      success: true,
      error: false,
      message: response.data.message,
      user: response.data.user,
    }));
  } catch (error) {
    props((prev) => ({
      ...prev,
      loading: false,
      success: false,
      error: true,
      message: error.response.data.error,
    }));
  }
}

async function requestManageTopicsUser(props, id) {
  try {
    const response = await MANAGETOPICUSER(id);
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
      message: error.response.data.error,
    }));
  }
}

async function requestGetArticleUserPublished(props, id, query) {
  try {
    props((prev) => ({ ...prev, loading: true }));
    const response = await GETARTICLEBYUSERPUBLISHED(id, query);
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

async function requestGetArticleUserDraft(props, id, query) {
  try {
    props((prev) => ({ ...prev, loading: true }));
    const response = await GETARTICLEBYUSERDRAFT(id, query);
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

async function requestChangeRole(props, id, role) {
  try {
    const response = await CHANGEROLE(id, role);
    props((prev) => ({
      ...prev,
      error: false,
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
      error: true,
      message: error.response.data.message,
    }));
  }
}

async function requestChangePassword(props, state) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await CHANGEPASSWORD(state);
    props((prev) => ({
      ...prev,
      error: false,
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
  } catch (error) {
    props((prev) => ({
      ...prev,
      fetching: false,
      error: true,
      message: {
        error: error.response.data.message,
        validation: error.response.data.validation,
      },
    }));
  }
}

async function requestChangeName(props, state) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await CHANGENAME(state);
    props((prev) => ({
      ...prev,
      error: false,
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
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    props((prev) => ({
      ...prev,
      fetching: false,
      error: true,
      message: {
        error: error.response.data.message,
        validation: error.response.data.validation,
      },
    }));
  }
}

async function requestChangeEmail(props, state) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await CHANGEEMAIL(state);
    props((prev) => ({
      ...prev,
      error: false,
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

    // if (response.status === 200) {
    //   setInterval(() => {
    //     window.location.reload();
    //   }, 2000);
    // }
  } catch (error) {
    console.log(error);
    props((prev) => ({
      ...prev,
      fetching: false,
      error: true,
      message: {
        error: error.response.data.message,
        validation: error.response.data.validation,
      },
    }));
  }
}

async function requestChangePhoto(props, formData) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await CHANGEPHOTO(formData);
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

    if (response.status === 200) {
      setInterval(() => {
        window.location.reload();
      }, 3000);
    }
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
      message: error.response.data.error,
    }));
  }
}

async function requestChangeBiodata(props, state) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await CHANGEBIODATA(state);
    props((prev) => ({
      ...prev,
      error: false,
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
      }, 2000);
    }
  } catch (error) {
    props((prev) => ({
      ...prev,
      fetching: false,
      error: true,
      message: {
        error: error.response.data.message,
        validation: error.response.data.validation,
      },
    }));
  }
}

export {
  requestProfile,
  requestGetUserDetail,
  requestManageTopicsUser,
  requestGetArticleUserPublished,
  requestGetArticleUserDraft,
  requestChangeRole,
  requestChangeName,
  requestChangeEmail,
  requestChangePassword,
  requestChangePhoto,
  requestChangeBiodata,
};
