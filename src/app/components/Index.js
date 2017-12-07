import React from "react";
import RaisedButton from 'material-ui/RaisedButton';

let Index = (props)=>{
    return(
        <div className="index">
            <p>歡迎來到ChatChat, 與您的朋友暢所欲聊...</p>
            {props.currentUser._id===props.currentUser.name && <RaisedButton label="修改暱稱" secondary={true} style={{margin: "13px"}} 
            onClick={props.toggleUserSettings}/>}
            <div className="mascot"/>
            <RaisedButton label="創建新聊天室" secondary={true} style={{margin: "13px", fontSize: "16px"}} 
            onClick={props.toggleAddRoom}/>
            <RaisedButton label="進入新聊天室" secondary={true} style={{margin: "13px", fontSize: "16px"}} 
            onClick={props.toggleEnterRoom}/>
        </div>
    );
}


import {connect} from "react-redux";

const mapStateToProps=(state)=>{
    return {currentUser: state.currentUser};
  }

Index = connect(mapStateToProps,null)(Index);


module.exports = Index;