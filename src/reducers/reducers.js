import redux from "redux";

const reducers = {
    reducer_lastAction:
    (state = null, action)=>{
      return action.type;
    },
    reducer_currentUid:
      (state = null, action)=>{
        if(action.type == "LOGIN" && action.payload!=null){
          return action.payload;
        }else if(action.type == "LOGOUT"){
          return action.payload;
        }
        else{
          // initilization
          return state;
        }
      }
  };

  module.exports = reducers;