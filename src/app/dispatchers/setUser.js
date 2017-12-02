const setUser = (type,data)=>{
    if(type == "LOGIN" || type == "RESET"){
        return {
            type: "LOGIN",
            payload: data
        };
    }else if(type == "LOGOUT"){
        return {
            type: "LOGOUT",
            payload: null
        };
    }
}

module.exports = setUser;