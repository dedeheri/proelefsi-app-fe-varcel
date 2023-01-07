import {
  TOPICS,
  ADDTOPICS,
  DETAILTOPICS,
  EDITTOPICS,
  DELETEDTOPICS,
} from "../api/fetching/topics";
import toast from "react-hot-toast";
import { getAllCookies } from "../utils/Cookie";

const cookie = getAllCookies();

const baseUrl = process.env.REACT_APP_BASE_URL;

async function requestTopics(props, query) {
  try {
    props((prev) => ({ ...prev, loading: true }));
    const response = await TOPICS(query);
    props((prev) => ({
      ...prev,
      loading: false,
      error: false,
      success: true,
      message: response.data.message,
      data: {
        topics: response.data.topics,
        page: response.data.page,
      },
    }));
  } catch (error) {
    props((prev) => ({
      ...prev,
      loading: true,
      error: true,
      success: false,
      data: {
        topics: [],
        page: [],
      },
      message: error.response.data.message || error.response.data.error,
    }));
  }
  props((prev) => ({ ...prev, loading: false }));
}

async function requestDetailTopics(props, id) {
  try {
    const response = await DETAILTOPICS(id);
    props((prev) => ({
      ...prev,
      loading: false,
      error: false,
      success: true,
      message: response.data.message,
      data: response.data.topics,
    }));
  } catch (error) {
    props((prev) => ({
      ...prev,
      loading: true,
      error: true,
      success: false,
      message: error.response.data.message,
    }));
  }
}

async function requestAddTopics(props, topics, description) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await ADDTOPICS(topics, description);
    props((prev) => ({
      ...prev,
      fetching: false,
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

    if (response.status === 200) {
      setInterval(() => {
        window.location.href = `${baseUrl}/dashboard/topics`;
      }, 3000);
    }
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
      fetching: false,
      error: true,
      success: false,
      message: {
        message: error.response.data.message,
        validation: error.response.data.validation,
      },
    }));
  }
}

async function requestEditTopics(props, id, topics, description) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await EDITTOPICS(id, topics, description);
    props((prev) => ({
      ...prev,
      fetching: false,
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

    if (response.status === 200) {
      setInterval(() => {
        window.location.href = `${baseUrl}/dashboard/topics`;
      }, 3000);
    }
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
      fetching: false,
      error: true,
      success: false,
      message: {
        message: error.response.data.message,
        validation: error.response.data.validation,
      },
    }));
  }
}

async function requestDeletedTopics(props, id) {
  try {
    props((prev) => ({ ...prev, fetching: true }));
    const response = await DELETEDTOPICS(id);
    props((prev) => ({
      ...prev,
      fetching: false,
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
      fetching: false,
      error: true,
      success: false,
      message: error.response.data.message,
    }));
  }
}

export {
  requestTopics,
  requestAddTopics,
  requestDetailTopics,
  requestEditTopics,
  requestDeletedTopics,
};
