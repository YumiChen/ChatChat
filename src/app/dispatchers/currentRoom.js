// currentRoom

module.exports = (_id)=>{
    // set to null when user leaves current Room
    if(_id===null) return {type:"CHANGEROOM",payload:null};
    // fetch to get room data
    return (dispatch)=>{
        const api = "a/room/findOne?_id="+_id;
        fetch(api,{
            method: 'get',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: "JWT "+sessionStorage.getItem("token")
            },
            body: undefined
        })
        .then((data)=>{
            return data.json();
        }).then((data)=>{
            dispatch({
            type: "CHANGEROOM",
            payload: data.result
            });
        })
          // .catch(err,()=>{alert(err)});
      };
};