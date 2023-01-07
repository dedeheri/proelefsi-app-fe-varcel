import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  fetching: false,
  data: [],
  message: {},
};

function searchResult(state = initialState, action) {
  switch (action.type) {
    case main.SUCCESS_GET_SEARCHRESULT: {
      return {
        ...state,
        error: false,
        success: true,
        fetching: false,
        data: action.data,
        message: action.message,
      };
    }
    case main.FAILED_GET_SEARCHRESULT: {
      return {
        ...state,
        error: true,
        success: false,
        fetching: false,
        message: action.message,
      };
    }
    case main.CLEAR_SEARCHRESULT: {
      return { ...state, data: [] };
    }

    default:
      return state;
  }
}

export default searchResult;
