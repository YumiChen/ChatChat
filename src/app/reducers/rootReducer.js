import reducers from "./reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    currentUser: reducers.currentUser,
    currentRoom: reducers.currentRoom,
    lastAction: reducers.lastAction
  });

  module.exports = rootReducer;
