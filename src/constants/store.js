import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import combineReducer from "./reducer";

const store = createStore(combineReducer, compose(applyMiddleware(thunk)));
export default store;
