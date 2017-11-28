// state: currentUser
// dispatcher: currentRoom

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Sidebar extends React.Component{
  constructor(props){
    super(props);
    this.changeRoom = this.changeRoom.bind(this);
  }
  changeRoom(event){
    const id = event.target.value;
    this.props.changeRoom(id);
  }
  render(){
    const props = this.props;
    return (
      <div className="sidebar">
      <Drawer
      docked={false}
      width={200}
      open={props.open}
      onRequestChange={props.toggleNav}
      >
      {this.props.currentUser.rooms.map((room)=>{
        return (<MenuItem primaryText={room.name} value={room.id} onClick={this.changeRoom}/>);
      })}
      <Divider />
      <MenuItem primaryText="Add new chatroom" leftIcon={<ContentCopy />} 
        onClick={props.toggleAddRoom}/>
        <MenuItem primaryText="Enter new room" leftIcon={<PersonAdd />} />
    </Drawer>
  
      </div>
    )
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
        changeRoom: currentRoom,
        setUser: setUser
      },dispatch);
    }
  
  Sidebar = connect(mapStateToProps,mapDispatchToProps)(Sidebar);
  

  export default Sidebar;