import redux from "redux";

const reducers = {
    lastAction:
    (state = null, action)=>{
      return action.type;
    },
    // Object: _id, name, rooms, valid
    currentUser:
      (state = null, action)=>{
        var result;
        switch(action.type){
          case "LOGIN":
            if(action.payload==null) break;
            return action.payload;
          case "LOGOUT":
            return null;
          case "LEAVEROOM":
            // pass in id and name of room to leave
            var index = state.indexOf({_id:action.payload._id, name: action.payload.name});
            if(index>=0){
              result = JSON.parse(JSON.stringify(state));
              result.splice(index,1);
              return result;
            }
            break;
          case "ADDTOROOM":
            // pass in id and name of room
            result = JSON.parse(JSON.stringify(state));
            result.rooms.push({_id:action.payload._id, name: action.payload.name});
            return result;
          case "CHANGENAME":
            break;
        }
        return state;
      },
      // Object: _id, name, members, log, valid
      currentRoom:
      (state = null, action)=>{
        if(action.type=="CHANGEROOM") return action.payload;
        else if(action.type == "ADDLOG") {
          let result = JSON.parse(JSON.stringify(state));
          result.log.push(action.payload);
          return result;
        }
        return state;
      }
  };

  module.exports = reducers;