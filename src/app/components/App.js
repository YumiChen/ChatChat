import {Component} from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Log from "./Log";
import AddRoom from "./dialogs/AddRoom";
import EnterRoom from "./dialogs/EnterRoom";
import RoomSettings from "./RoomSettings";
import UserSettings from "./UserSettings";
import Index from "./Index";
import Login from "./Login";
import DisplaySettings from "./DisplaySettings";
import LoadingAnimation from "./LoadingAnimation";

// detect device
import detectDevice from "../../detectDevice";


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      showNav: false,
      showAddRoom: false,
      showRoomSettings: false,
      showEnterRoom: false,
      showUserSettings: false,
      initialSelectedIndex: -1,
      showDisplaySettings: false
  };
  this.toggleNav = this.toggleNav.bind(this);
  this.toggleAddRoom = this.toggleAddRoom.bind(this);
  this.toggleRoomSettings = this.toggleRoomSettings.bind(this);
  this.toggleEnterRoom = this.toggleEnterRoom.bind(this);
  this.toggleUserSettings = this.toggleUserSettings.bind(this);
  this.toggleDisplaySettings = this.toggleDisplaySettings.bind(this);
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
    this.setState({showUserSettings:!this.state.showUserSettings},()=>{
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
  toggleDisplaySettings(){
    this.setState({showDisplaySettings:!this.state.showDisplaySettings},()=>{
      if(this.state.showDisplaySettings) this.setState({showNav: false});
    });
  }
  componentDidMount(){
    if(mobileAndTabletcheck()){
      // document.body.style.height = window.innerHeight +'px';
      window.onresize = function(){
        // var height = window.innerHeight +'px';
        // document.body.style.height = height;
        setTimeout(function(){
          document.querySelector("#output").scrollTop = output.scrollHeight;
        },600);
    }
    }
  }
  render(){
    const loggedIn = (this.props.currentUser!=null);
    let el = loggedIn?<Index toggleAddRoom={this.toggleAddRoom} toggleEnterRoom={this.toggleEnterRoom}
                        toggleUserSettings={this.toggleUserSettings}/>:<Login/>;
    if(this.props.currentRoom && loggedIn) el = <Log/>;
    return (
      <div style={{height: "100%"}}>
        <Nav toggleNav={this.toggleNav} toggleRoomSettings={this.toggleRoomSettings}/>
        <div className="mainContainer">
          {loggedIn && <Sidebar open={this.state.showNav} toggle={this.toggleNav} toggleAddRoom={this.toggleAddRoom} toggleEnterRoom={this.toggleEnterRoom} toggleUserSettings={this.toggleUserSettings}
                                toggleDisplaySettings={this.toggleDisplaySettings}/>}
          {loggedIn && <AddRoom  open={this.state.showAddRoom} toggle={this.toggleAddRoom} toggleRoomSettings={this.toggleRoomSettings}/>}
          {loggedIn && <EnterRoom  open={this.state.showEnterRoom} toggle={this.toggleEnterRoom}/>}
          {loggedIn && <UserSettings  open={this.state.showUserSettings} toggle={this.toggleUserSettings}/>}
          {loggedIn && <DisplaySettings open = {this.state.showDisplaySettings} toggle={this.toggleDisplaySettings}/>}
          {this.props.currentRoom!=null && <RoomSettings open={this.state.showRoomSettings} toggle={this.toggleRoomSettings}
                        initialSelectedIndex={this.state.initialSelectedIndex}
          />}
          {el}
          {this.props.loading && <LoadingAnimation />}
        </div>
    </div>
    );
  }
}

import {connect} from "react-redux";

const mapStateToProps=(state)=>{
    return {currentUser: state.currentUser,
            currentRoom: state.currentRoom,
            loading: state.loading
           };
  }

App = connect(mapStateToProps,null)(App);

export default App;
