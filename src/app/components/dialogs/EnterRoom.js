import {Component} from 'react';
import BaseDialog from "./BaseDialog";

class EnterRoom extends Component{
    constructor(props){
        super(props);
        this.enterRoom = this.enterRoom.bind(this);
    }
    enterRoom(value,setHint){
      if(value===""){
        setHint("此欄位不可為空白");
        return;
      }
      let index = this.props.currentUser.rooms.findIndex((el)=>{
        return el._id == value;
      });
      debug(index);
      if(index >= 0){
        setHint("您已加入此房間");
        return;
      }
      const that = this;
          // insert room
          const api = "user/addToRoom?userId="+that.props.currentUser._id +"&password="+value;
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
            if(data.statusText=="Unauthorized") return {success: false};
            return data.json();
          }).then((data)=>{
            if(data.success){
              index = this.props.currentUser.rooms.findIndex((el)=>{
                return el._id == data.result._id;
              });
              if(index >= 0){
                setHint("您已加入此房間");
                return;
              }
              that.props.toggle();
              that.props.handleRoom("ADDTOROOM", data.result._id, data.result.name);
              that.props.changeRoom(data.result._id);
            }else{
              setHint("邀請碼錯誤");
            }
          });
    }
    render(){
        return (
            <BaseDialog
                toggle = {this.props.toggle}        
                handle = {this.enterRoom}
                label = "邀請碼"
                floatingLabel = "邀請碼"
                title = "進入新聊天室"
                des1 = "請輸入邀請碼"
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