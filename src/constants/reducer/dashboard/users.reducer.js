import * as actionTypes from "../../actiontypes/dashboard";

const initialState = {
  user: {
    loading: true,
    success: false,
    error: false,
    message: "",
    data: {
      result: [],
      page: [],
    },
  },
  config: {
    loading: true,
    success: false,
    error: false,
    message: "",
    result: {},
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    // get
    case actionTypes.FETCHING_GET_ALL_USERS: {
      return {
        ...state,
        user: {
          ...state,
          loading: true,
        },
      };
    }
    case actionTypes.SUCCESS_GET_ALL_USERS: {
      return {
        ...state,
        user: {
          ...state,
          error: false,
          success: true,
          loading: false,
          message: action.message,
          data: {
            result: action.result,
            page: action.page,
          },
        },
      };
    }
    case actionTypes.FAILED_GET_ALL_USERS: {
      return {
        ...state,
        user: {
          ...state,
          error: true,
          success: false,
          loading: false,
          message: action.message,
          data: {},
        },
      };
    }

    // config
    case actionTypes.SUCCESS_GET_ALL_USERS_CONFIG: {
      return {
        ...state,
        config: {
          ...state,
          error: false,
          success: true,
          loading: false,
          message: action.message,
          result: action.result,
        },
      };
    }
    case actionTypes.FAILED_GET_ALL_USERS_CONFIG: {
      return {
        ...state,
        config: {
          ...state,
          error: true,
          success: false,
          loading: false,
          message: action.message,
          result: {},
        },
      };
    }

    default:
      return state;
  }
}

export default userReducer;
