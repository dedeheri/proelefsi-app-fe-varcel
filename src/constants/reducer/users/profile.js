import * as user from "../../actiontypes/user";

const initialState = {
  error: false,
  success: false,
  loading: true,
  data: {},
  message: {},
};

function profileUser(state = initialState, action) {
  switch (action.type) {
    case user.SUCCESS_GET_PROFILE_USER: {
      return {
        ...state,
        error: false,
        success: true,
        loading: false,
        data: action.payload,
        message: action.message,
      };
    }
    case user.FAILED_GET_PROFILE_USER: {
      return {
        ...state,
        error: true,
        success: false,
        loading: false,
        message: action.message,
      };
    }

    default:
      return state;
  }
}

export default profileUser;
