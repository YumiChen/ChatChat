import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Log from "./Log";
import AddRoom from "./AddRoom";
import RoomSettings from "./RoomSettings";

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
  }
  toggleNav(){
    this.setState({showNav:!this.state.showNav});
  }
  toggleAddRoom(){
    this.setState({showAddRoom:!this.state.showAddRoom},()=>{
      if(this.state.showAddRoom===false) this.toggleNav();
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
    return (
      <div>
        <Nav toggleNav={this.toggleNav} toggleRoomSettings={this.toggleRoomSettings}/>
        <div className="mainContainer">
          <Sidebar open={this.state.showNav} toggleNav={this.toggleNav} toggleAddRoom={this.toggleAddRoom}/>
          <AddRoom  open={this.state.showAddRoom} toggleAddRoom={this.toggleAddRoom}/>
          <RoomSettings open={this.state.showRoomSettings} toggleRoomSettings={this.toggleRoomSettings}
                        initialSelectedIndex={this.state.initialSelectedIndex}
          />
          <Log/>
        </div>
    </div>
    );
  }
}

export default App;
