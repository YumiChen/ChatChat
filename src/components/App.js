import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Log from "./Log";
import AddRoom from "./AddRoom";
import EnterRoom from "./EnterRoom";
import RoomSettings from "./RoomSettings";
import UserSettings from "./UserSettings";
import Index from "./Index";
import Login from "./Login";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showNav: false,
      showAddRoom: false,
      showRoomSettings: false,
      showEnterRoom: false,
      showUserSettings: false,
      initialSelectedIndex: -1,
      roomName: "",
      roomPassword: "",
      userName: "",
      roomNameHint:"",
      userNameHint:"",
      roomPasswordHint:""
  };
  this.toggleNav = this.toggleNav.bind(this);
  this.toggleAddRoom = this.toggleAddRoom.bind(this);
  this.toggleRoomSettings = this.toggleRoomSettings.bind(this);
  this.toggleEnterRoom = this.toggleEnterRoom.bind(this);
  this.toggleUserSettings = this.toggleUserSettings.bind(this);

  this.setUserName = this.setUserName.bind(this);
  this.setRoomName=this.setRoomName.bind(this);
  this.setRoomPassword = this.setRoomPassword.bind(this);
  
  this.enterRoom = this.enterRoom.bind(this);
  this.createRoom = this.createRoom.bind(this);
  this.updateUserName = this.updateUserName.bind(this);
  this.signOut = this.signOut.bind(this);
  }
  toggleNav(){
    this.setState({showNav:!this.state.showNav});
  }
  toggleAddRoom(){
    this.setState({showAddRoom:!this.state.showAddRoom},()=>{
      if(this.state.showAddRoom) this.setState({showNav: false});
    });
  }
  toggleEnterRoom(){
    this.setState({showEnterRoom:!this.state.showEnterRoom},()=>{
      if(this.state.showEnterRoom) this.setState({showNav: false});
    });
  }
  toggleUserSettings(){
    this.setState({showUserSettings:!this.state.showUserSettings, userName: this.props.currentUser.name},()=>{
      if(this.state.showUserSettings) this.setState({showNav: false});
    });
  }
  toggleRoomSettings(index){
    if(Number.isInteger(index)){
      this.setState({showRoomSettings:!this.state.showRoomSettings,
        initialSelectedIndex: index});
    }else{
      this.setState({showRoomSettings:!this.state.showRoomSettings});
    }
  }
  setRoomName(event, value){
    this.setState({roomName: value});
  }
  setRoomPassword(event, value){
    this.setState({roomPassword: value});
  }
  setUserName(event, value){
    this.setState({userName: value});
  }
  createRoom(){
    if(this.state.roomName===""){
      this.setState({roomNameHint: "此欄位不可為空白"});
      return;
    }
    const that = this;
    that.setState({showAddRoom:!that.state.showAddRoom},()=>{
      if(that.state.showAddRoom) that.setState({showNav: false});
      else{
        // insert room
        const api = "room/insert/?roomName="+this.state.roomName+"&userId="+this.props.currentUser._id+"&userName="+this.props.currentUser.name;
        console.log(api);
        fetch(encodeURI(api)).then((data)=>{
          return data.json();
        }).then((data)=>{
          // get data of inserted room
          // update global state: currentUser.rooms
          that.props.handleRoom("ADDTOROOM", data.result._id, data.result.name);
          that.props.changeRoom(data.result._id);
          that.toggleRoomSettings(1);
        });
      }
    });
  }
  enterRoom(){
    if(this.state.roomPassword===""){
      this.setState({roomPasswordHint: "此欄位不可為空白"});
      return;
    }
    const that = this;
    that.setState({showEnterRoom:!that.state.showEnterRoom},()=>{
      if(that.state.showEnterRoom) that.setState({showNav: false});
      else{
        // insert room
        const api = "user/addToRoom?userId="+this.props.currentUser._id+"&userName="+this.props.currentUser.name+"&password="+this.state.roomPassword;
        console.log(api);
        fetch(encodeURI(api)).then((data)=>{
          return data.json();
        }).then((data)=>{
          if(data.success){
            that.props.handleRoom("ADDTOROOM", data.result._id, data.result.name);
            that.props.changeRoom(data.result._id);
          }else{
            that.setState({roomPasswordHint: "邀請碼錯誤"});
          }
        });
      }
    });
  }
  updateUserName(){
    if(this.state.userName===""){
      this.setState({userNameHint: "此欄位不可為空白"});
      return;
    }
    const that = this;
    this.setState({showUserSettings:!this.state.showUserSettings},()=>{
      if(this.state.showUserSettings) this.setState({showNav: false});
      else{
        // insert room
        const api = "user/updateName?_id="+this.props.currentUser._id+"&name="+this.state.userName;
        console.log(api);
        fetch(encodeURI(api)).then((data)=>{
          return data.json();
        }).then((data)=>{
          that.props.setUser("RESET",data.result);
          that.props.changeRoom(this.props.currentRoom._id);
        });
      }
    });
  }
  signOut(){
    this.props.setUser("LOGOUT");
    this.props.changeRoom(null);
    this.toggleNav();
  }
  render(){
    const loggedIn = (this.props.currentUser!=null);
    let el = loggedIn?<Index toggleAddRoom={this.toggleAddRoom} toggleEnterRoom={this.toggleEnterRoom}/>:<Login/>;
    if(this.props.currentRoom && loggedIn) el = <Log/>;
    return (
      <div>
        <Nav toggleNav={this.toggleNav} toggleRoomSettings={this.toggleRoomSettings}/>
        <div className="mainContainer">
          {loggedIn && <Sidebar open={this.state.showNav} toggleNav={this.toggleNav} toggleAddRoom={this.toggleAddRoom} toggleEnterRoom={this.toggleEnterRoom} toggleUserSettings={this.toggleUserSettings}
                         signOut={this.signOut}/>}
          {loggedIn && <AddRoom  open={this.state.showAddRoom} toggle={this.toggleAddRoom} createRoom={this.createRoom} roomName={this.props.roomName} onChange={this.setRoomName}
                        hint={this.state.roomNameHint}/>}
          {loggedIn && <EnterRoom  open={this.state.showEnterRoom} toggle={this.toggleEnterRoom} enterRoom={this.enterRoom} roomPassword={this.props.roomPassword} onChange={this.setRoomPassword}
                        hint={this.state.roomPasswordHint}/>}
          {loggedIn && <UserSettings  open={this.state.showUserSettings} toggle={this.toggleUserSettings} updateUserName={this.updateUserName} roomPassword={this.props.userName} onChange={this.setUserName}
                        hint={this.state.userNameHint}/>}
          {this.props.currentRoom!=null && <RoomSettings open={this.state.showRoomSettings} toggle={this.toggleRoomSettings}
                        initialSelectedIndex={this.state.initialSelectedIndex}
          />}
          {el}
        </div>
    </div>
    );
  }
}

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
      changeRoom: currentRoom,
      setUser: setUser
    },dispatch);
  }

App = connect(mapStateToProps,mapDispatchToProps)(App);

export default App;
