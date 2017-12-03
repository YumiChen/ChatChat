import React from 'react';
import BaseDialog from "./BaseDialog";

class AddRoom extends React.Component{
    constructor(props){
        super(props);
        this.createRoom = this.createRoom.bind(this);
    }
    createRoom(value,setHint){
        if(value===""){
          setHint("此欄位不可為空白");
          return;
        }
        const that = this;
            // insert room
        const api = "a/room/insert?roomName="+value+"&userId="+that.props.currentUser._id+"&userName="+this.props.currentUser.name;
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
                    that.props.handleRoom("ADDTOROOM", data.result._id, data.result.name);
                    that.props.changeRoom(data.result._id);
                    that.props.toggleRoomSettings(1);
                }else{
                    setHint("某處發生錯誤,請稍後再嘗試");
                }
            });
    }
    render(){
        return (
            <BaseDialog
                toggle = {this.props.toggle}        
                handle = {this.createRoom}
                label = "房間名稱 Room name"
                floatingLabel = "房間名稱 Room name"
                title = "創建新聊天室"
                des2 = "創建房間後將自動產生邀請碼"
                open={this.props.open}
            />);
    }
}


import handleRoom from "../../dispatchers/handleRooms";
import currentRoom from "../../dispatchers/currentRoom";
import setUser from "../../dispatchers/setUser";
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