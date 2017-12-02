module.exports = (action,_id, name)=>{
    return ({
        type: action,
        payload: {
          _id: _id,
          name: name
        }
    });
}