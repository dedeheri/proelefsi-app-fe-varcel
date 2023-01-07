import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  fetching: false,
  data: [],
  message: {},
};

function searchTerm(state = initialState, action) {
  switch (action.type) {
    case main.FETCHING_SEARCHTERM: {
      return {
        ...state,
        fetching: true,
      };
    }
    case main.SUCCESS_GET_SEARCHTERM: {
      return {
        ...state,
        error: false,
        success: true,
        fetching: false,
        data: action.payload,
        message: action.message,
      };
    }
    case main.FAILED_GET_SEARCHTERM: {
      return {
        ...state,
        error: true,
        success: false,
        fetching: false,
        message: action.message,
      };
    }
    case main.CLEAR_SEARCHTERM: {
      return { ...state, data: [] };
    }

    default:
      return state;
  }
}

export default searchTerm;
