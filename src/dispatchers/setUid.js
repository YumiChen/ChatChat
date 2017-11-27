const setUid = (type)=>{
    if(type == "login"){
        return {
            type: "LOGIN",
            payload: sessionStorage.getItem("user")
        };
    }else if(type == "logout"){
        return {
            type: "LOGOUT",
            payload: null
        };
    }
}

module.exports = setUid;