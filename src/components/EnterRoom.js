import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class EnterRoom extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            roomPassword: "",
            roomPasswordHint:""
        };
        this.setRoomPassword = this.setRoomPassword.bind(this);
        this.enterRoom = this.enterRoom.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle(){
      this.props.toggle();
      this.setState({ roomPassword: "", roomPasswordHint:""});
    }
    setRoomPassword(event, value){
        this.setState({roomPassword: value});
    }
    enterRoom(){
        if(this.state.roomPassword===""){
          this.setState({roomPasswordHint: "此欄位不可為空白"});
          return;
        }
        let index = this.props.currentUser.rooms.findIndex((el)=>{
          return el._id == this.state.roomPassword;
        });
        console.log(index);
        if(index >= 0){
          this.setState({roomPasswordHint: "您已加入此房間"});
          return;
        }
        const that = this;
        this.props.toggle();
            // insert room
            const api = "user/addToRoom?userId="+that.props.currentUser._id+"&userName="+that.props.currentUser.name+"&password="+that.state.roomPassword;
            console.log(api);
            fetch(encodeURI(api),{
              method: 'get',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                auth: sessionStorage.getItem("token")
              },
              body: undefined
            }).then((data)=>{
              return data.json();
            }).then((data)=>{
              if(data.success){
                index = this.props.currentUser.rooms.findIndex((el)=>{
                  return el._id == data.result._id;
                });
                if(index >= 0){
                  that.setState({roomPasswordHint: "您已加入此房間"});
                  return;
                }
                that.props.handleRoom("ADDTOROOM", data.result._id, data.result.name);
                that.props.changeRoom(data.result._id);
              }else{
                that.setState({roomPasswordHint: "邀請碼錯誤"});
              }
            });
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
            label="進入"
            primary={true}
            keyboardFocused={true}
            onClick={this.enterRoom}
            />
        ];
    return (
        <Dialog
        title="進入新聊天室"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.toggle}
        titleStyle={{padding: "18px 20px", fontWeight: "bold"}}
        >
        <p style={{margin: "0.5rem 0"}}>請輸入邀請碼</p>
        <TextField
        floatingLabelText="邀請碼"
        onChange={this.setRoomPassword}
        value={this.state.roomPassword}
        />
        <p className="hint">{this.state.roomPasswordHint}</p>
      </Dialog>);
    }
};

import handleRoom from "../dispatchers/handleRooms";
import currentRoom from "../dispatchers/currentRoom";
import setUser from "../dispatchers/setUser";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const mapStateToProps=(state)=>{
    return {currentUser: state.currentUser};
  }
  const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
      handleRoom: handleRoom,
      changeRoom: currentRoom
    },dispatch);
  }

EnterRoom = connect(mapStateToProps,mapDispatchToProps)(EnterRoom);

module.exports = EnterRoom;