import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

const Index = (props)=>{
    return(
        <div className="index">
            <p>歡迎來到ChatChat, 與您的朋友暢所欲聊...</p>
            <div className="mascot"/>
            <RaisedButton label="創建新聊天室" primary={true} style={{margin: "0.8rem"}} 
            onClick={props.toggleAddRoom}/>
            <RaisedButton label="進入新聊天室" primary={true} style={{margin: "0.8rem"}} 
            onClick={props.toggleEnterRoom}/>
        </div>
    );
}

module.exports = Index;