import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Log from "./Log";
import AddRoom from "./AddRoom";
import RoomSettings from "./RoomSettings";
import Index from "./Index";
import Login from "./Login";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showNav: false,
      showAddRoom: false,
      showRoomSettings: false,
      initialSelectedIndex: -1
  };
  this.toggleNav = this.toggleNav.bind(this);
  this.toggleAddRoom = this.toggleAddRoom.bind(this);
  this.toggleRoomSettings = this.toggleRoomSettings.bind(this);
  this.createRoom = this.createRoom.bind(this);
  }
  toggleNav(){
    this.setState({showNav:!this.state.showNav});
  }
  toggleAddRoom(){
    this.setState({showAddRoom:!this.state.showAddRoom},()=>{
      if(this.state.showAddRoom) this.setState({showNav: false});
    });
  }
  createRoom(){
    const that = this;
    that.setState({showAddRoom:!that.state.showAddRoom},()=>{
      if(that.state.showAddRoom) that.setState({showNav: false});
      else{
        // insert room
        const api = "room/insert/?roomName="+"543"+"&userId="+this.props.currentUser._id+"&userName"+this.props.currentUser.name;
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
  toggleRoomSettings(index){
    console.log(index);
    if(Number.isInteger(index)){
      this.setState({showRoomSettings:!this.state.showRoomSettings,
        initialSelectedIndex: index});
    }else{
      this.setState({showRoomSettings:!this.state.showRoomSettings});
    }
  }
  render(){
    console.log(this.props.currentRoom);
    const loggedIn = (this.props.currentUser!=null);
    let el = loggedIn?<Index/>:<Login/>;
    if(this.props.currentRoom) el = <Log/>;
    return (
      <div>
        <Nav toggleNav={this.toggleNav} toggleRoomSettings={this.toggleRoomSettings}/>
        <div className="mainContainer">
          {loggedIn && <Sidebar open={this.state.showNav} toggleNav={this.toggleNav} toggleAddRoom={this.toggleAddRoom}/>}
          {loggedIn && <AddRoom  open={this.state.showAddRoom} toggleAddRoom={this.toggleAddRoom} createRoom={this.createRoom}/>}
          {this.props.currentRoom!=null && <RoomSettings open={this.state.showRoomSettings} toggleRoomSettings={this.toggleRoomSettings}
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
