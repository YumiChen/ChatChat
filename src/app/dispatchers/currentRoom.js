import store from "../store";

module.exports = (_idorData)=>{
    debug(_idorData);
    // set to null when user leaves current Room
    if(_idorData===null) return {type:"CHANGEROOM",payload:null};
    // directly dispatch if room data is passed in
    else if(typeof _idorData === 'object') return {type: "CHANGEROOM", payload: _idorData};
    
    // fetch to get room data
    return (dispatch)=>{
        const api = "room/findOne?_id="+_idorData;
        debug(api);

        dispatch({
            type: "TOGGLELOADING",
            payload: true
        });

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
            if(data.statusText=="Unauthorized") return {success: false};
            return data.json();
        }).then((data)=>{
            debug(data);
            dispatch({
            type: "CHANGEROOM",
            payload: data.result
            });

            dispatch({
                type: "TOGGLELOADING",
                payload: false
            });
        })
          // .catch(err,()=>{alert(err)});
      };
};