import * as actionTypes from "../../actiontypes/dashboard";

const initialState = {
  error: false,
  success: false,
  loading: true,
  message: "",
  data: [],
  page: {},

  delete: {
    message: "",
    error: false,
    success: false,
    fetching: false,
  },
  analysis: {
    data: [],
    message: "",
    loading: true,
    error: false,
    success: false,
  },
  detail: {
    error: false,
    success: false,
    loading: true,
    message: "",
    result: {},
  },
  add: {
    form_validation: {},
    message: "",
    error: false,
    success: false,
    fetching: false,
  },
  edit: {
    form_validation: {},
    message: "",
    error: false,
    success: false,
    fetching: false,
  },
};

function article(state = initialState, action) {
  switch (action.type) {
    // get
    case actionTypes.FETCHING_GET_ALL_ARTICLE: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.SUCCESS_GET_ALL_ARTICLE: {
      return {
        ...state,
        error: false,
        success: true,
        loading: false,
        message: action.message,
        data: action.data,
        page: action.page,
      };
    }
    case actionTypes.FAILED_GET_ALL_ARTICLE: {
      return {
        ...state,
        error: true,
        success: false,
        loading: false,
        message: action.message,
      };
    }

    // delete
    case actionTypes.FETCHING_DELETE_ARTICLE: {
      return {
        ...state,
        delete: {
          ...state,
          fetching: true,
        },
      };
    }
    case actionTypes.SUCCESS_DELETE_ARTICLE: {
      return {
        ...state,
        delete: {
          ...state,
          success: true,
          message: action.message,
          error: false,
        },
      };
    }
    case actionTypes.FAILED_DELETE_ARTICLE: {
      return {
        ...state,
        delete: {
          ...state,
          success: false,
          message: action.message,
          error: true,
        },
      };
    }

    // analysis
    case actionTypes.SUCCESS_ARTICLE_ANALYSIS: {
      return {
        ...state,
        analysis: {
          ...state,
          success: true,
          data: action.data,
          loading: false,
          message: action.message,
          error: false,
        },
      };
    }
    case actionTypes.FAILED_ARTICLE_ANALYSIS: {
      return {
        ...state,
        analysis: {
          ...state,
          success: false,
          loading: false,
          message: action.message,
          error: true,
        },
      };
    }

    // detail
    case actionTypes.SUCCESS_DETAIL_ARTICLE: {
      return {
        ...state,
        detail: {
          error: false,
          success: true,
          loading: false,
          message: action.message,
          result: action.result,
        },
      };
    }
    case actionTypes.FAILED_DETAIL_ARTICLE: {
      return {
        ...state,
        detail: {
          error: true,
          success: false,
          loading: false,
          message: action.message,
        },
      };
    }
    case actionTypes.CLEAR_DETAIL_ARTICLE: {
      return {
        ...state,
        detail: {
          error: false,
          success: true,
          loading: false,
          message: "",
          result: {},
        },
      };
    }

    // add
    case actionTypes.FETCHING_ADD_ARTICLE: {
      return {
        ...state,
        add: {
          fetching: true,
        },
      };
    }
    case actionTypes.SUCCESS_ADD_ARTICLE: {
      return {
        ...state,
        add: {
          success: true,
          message: action.message,
          error: false,
        },
      };
    }
    case actionTypes.FAILED_ADD_ARTICLE: {
      return {
        ...state,
        add: {
          success: false,
          message: action.message,
          form_validation: action.form_validation,
          error: true,
        },
      };
    }

    case actionTypes.FETCHING_EDIT_ARTICLE: {
      return {
        ...state,
        edit: {
          ...state.edit,
          fetching: true,
        },
      };
    }
    case actionTypes.SUCCESS_EDIT_ARTICLE: {
      return {
        ...state,
        edit: {
          success: true,
          message: action.message,
          error: false,
          fetching: false,
          image_url: action.image_url,
          image_url_priview: action.image_url_priview,
          title: action.title,
          sub_title: action.sub_title,
          content: action.content,
          topics: action.topics,
          tags: action.tags,
          draft: action.draft,
        },
      };
    }
    case actionTypes.FAILED_EDIT_ARTICLE: {
      return {
        ...state,
        edit: {
          success: false,
          message: action.message,
          form_validation: action.form_validation,
          error: true,
        },
      };
    }

    default:
      return state;
  }
}

export default article;
