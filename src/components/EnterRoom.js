import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class EnterRoom extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const actions = [
            <FlatButton
            label="取消"
            primary={true}
            keyboardFocused={true}
            onClick={this.props.toggle}
            />,
            <FlatButton
            label="進入"
            primary={true}
            keyboardFocused={true}
            onClick={this.props.enterRoom}
            />
        ];
    return (
        <Dialog
        title="進入新聊天室"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.toggle}
        titleStyle={{padding: "18px 20px", fontWeight: "bold", color: "rgb(0, 188, 212);"}}
        >
        <p style={{margin: "0.5rem 0"}}>請輸入邀請碼</p>
        <TextField
        floatingLabelText="邀請碼"
        onChange={this.props.onChange}
        value={this.props.roomPassword}
        />
        <p className="hint">{this.props.hint}</p>
      </Dialog>);
    }
};

import handleRoom from "../dispatchers/handleRooms";
import currentRoom from "../dispatchers/currentRoom";
import setUser from "../dispatchers/setUser";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const mapStateToProps=(state)=>{
    return {currentUser: state.currentUser,
            currentRoom: state.currentRoom
           };
  }
  const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
      handleRoom: handleRoom,
      changeRoom: currentRoom
    },dispatch);
  }

EnterRoom = connect(mapStateToProps,mapDispatchToProps)(EnterRoom);

module.exports = EnterRoom;