// dispatcher: currentUser, currentRoom

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddRoom extends React.Component{
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
            label="創建"
            primary={true}
            keyboardFocused={true}
            onClick={this.props.createRoom}
            />
        ];
    return (
        <Dialog
        title="創建新聊天室"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.toggle}
        titleStyle={{padding: "18px 20px", fontWeight: "bold", color: "rgb(0, 188, 212);"}}
      >
        <TextField
        floatingLabelText="房間名稱 Room name"
        onChange={this.props.onChange}
        value={this.props.roomName}
        />
        <p className="hint">{this.props.hint}</p>
        <p>創建房間後將自動產生邀請碼</p>
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

AddRoom = connect(mapStateToProps,mapDispatchToProps)(AddRoom);

module.exports = AddRoom;