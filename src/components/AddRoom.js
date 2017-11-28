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
            onClick={this.props.toggleAddRoom}
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
        title="Create new chatroom"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.toggleAddRoom}
      >
        <TextField
        hintText="輸入您喜歡的名稱..."
        floatingLabelText="Room name"
        />
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