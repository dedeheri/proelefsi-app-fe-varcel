import { combineReducers } from "redux";

import { profileUser, role } from "./users";

// auth
import {
  signUpAccount,
  verifyEmailAccountAction,
  changeRoleAction,
  deleteAccountReducer,
  signInReducer,
} from "./auth";
import {
  otherRedux,
  slideTopicsRedux,
  reportModalRedux,
  reportModalDeleteMainRedux,
  slideSidebarRedux,
} from "./other";
import {
  topics,
  byTopics,
  trending,
  searchTerm,
  detailArticle,
  forYou,
  report,
  notInterested,
  shortLink,
  searchResult,
  userMainReducer,
  articleByUserReducer,
  searchTermHistoryReducer,
} from "./main";

// dashboard
import { article, userReducer } from "./dashboard";

const combineReducer = combineReducers({
  profileUser,
  role,
  otherRedux,
  topics,
  slideSidebarRedux,
  trending,
  slideTopicsRedux,
  reportModalDeleteMainRedux,
  searchTerm,
  detailArticle,
  forYou,
  reportModalRedux,
  byTopics,
  report,
  notInterested,
  shortLink,
  searchResult,
  article,
  userMainReducer,
  articleByUserReducer,
  // account
  signUpAccount,
  verifyEmailAccountAction,
  changeRoleAction,
  deleteAccountReducer,
  signInReducer,
  // dashboard
  userReducer,
  searchTermHistoryReducer,
});

export default combineReducer;
