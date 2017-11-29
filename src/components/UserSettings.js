// dispatcher: currentUser, currentRoom

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class UserSettings extends React.Component{
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
            label="修改"
            primary={true}
            keyboardFocused={true}
            onClick={this.props.updateUserName}
            />
        ];
    return (
        <Dialog
        title="修改個人資料"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.toggle}
        titleStyle={{padding: "18px 20px", fontWeight: "bold", color: "rgb(0, 188, 212);"}}
      >
        <TextField
        defaultValue={this.props.currentUser.name}
        floatingLabelText="暱稱"
        onChange={this.props.onChange}
        value={this.props.userName}
        />
        <p className="hint">{this.props.hint}</p>
        <p>若欲修改密碼請點此</p>
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

UserSettings = connect(mapStateToProps,mapDispatchToProps)(UserSettings);

module.exports = UserSettings;