import { HOME } from "../api/fetching";
import { ACTIVITYARTICLE } from "../api/fetching/home";

async function requestHome(props) {
  try {
    const response = await HOME();
    props((prev) => ({
      ...prev,
      fetching: false,
      message: {
        success: response.data,
      },
    }));
  } catch (error) {
    console.log(error);
    props((prev) => ({
      ...prev,
      loading: false,
      error: true,
      message: error.response?.data?.message || error?.response?.data?.error,
    }));
  }
}

async function requestActivityArticle(props) {
  try {
    const response = await ACTIVITYARTICLE();
    props((prev) => ({
      ...prev,
      loading: false,
      success: true,
      message: response.data.message,
      data: response.data.data,
    }));
  } catch (error) {
    props((prev) => ({
      ...prev,
      loading: false,
      error: true,
      message: error?.response?.data?.error || error?.response?.data?.message,
    }));
  }
}

export { requestHome, requestActivityArticle };
