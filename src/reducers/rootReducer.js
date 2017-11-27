import reducers from "./reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    currentUid: reducers.reducer_currentUid,
    lastAction: reducers.reducer_lastAction
  });

  module.exports = rootReducer;
