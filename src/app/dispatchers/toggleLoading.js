module.exports = (show)=>{
    debug(show);
    return (
        {
            type: "TOGGLELOADING",
            payload: show
        }
    );
};