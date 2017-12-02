import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddRoom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            roomName: "",
            roomNameHint:""
        };
        this.setRoomName=this.setRoomName.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
        this.props.toggle();
        this.setState({ roomName: "", roomNameHint:""});
    }
    createRoom(){
        if(this.state.roomName===""){
          this.setState({roomNameHint: "此欄位不可為空白"});
          return;
        }
        const that = this;
            // insert room
        const api = "a/room/insert?roomName="+that.state.roomName+"&userId="+that.props.currentUser._id+"&userName="+this.props.currentUser.name;
            debug(api);
            fetch(encodeURI(api),{
                method: 'get',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  Authorization: "JWT "+sessionStorage.getItem("token")
                },
                body: undefined
              }).then((data)=>{
              return data.json();
            }).then((data)=>{
                if(data.success){
                    // get data of inserted room
                    // update global state: currentUser.rooms
                    that.props.toggle();
                    that.setState({roomName: "", roomNameHint: ""});
                    that.props.handleRoom("ADDTOROOM", data.result._id, data.result.name);
                    that.props.changeRoom(data.result._id);
                    that.props.toggleRoomSettings(1);
                }else{
                    this.setState({roomNameHint: "某處發生錯誤,請稍後再嘗試"});
                }
            });
    }
    setRoomName(event, value){
        this.setState({roomName: value});
    }
    render(){
        const actions = [
            <FlatButton
            label="取消"
            primary={true}
            keyboardFocused={true}
            onClick={this.toggle}
            />,
            <FlatButton
            label="創建"
            primary={true}
            keyboardFocused={true}
            onClick={this.createRoom}
            />
        ];
    return (
        <Dialog
        title="創建新聊天室"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.toggle}
        titleStyle={{padding: "18px 20px 0 20px", fontWeight: "bold"}}
      >
        <TextField
        floatingLabelText="房間名稱 Room name"
        onChange={this.setRoomName}
        value={this.state.roomName}
        style={{width: "90%"}}
        />
        <p className="hint">{this.state.roomNameHint}</p>
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
    return {currentUser: state.currentUser
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