const setUser = (type,data)=>{
    console.log(data);
    if(type == "LOGIN"){
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