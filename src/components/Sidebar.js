// state: currentUser
// dispatcher: currentRoom

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Forward from 'material-ui/svg-icons/content/forward';
import Divider from 'material-ui/Divider';
import Add from 'material-ui/svg-icons/content/add';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

class Sidebar extends React.Component{
  constructor(props){
    super(props);
    this.state = { selectedItem: 1231321};
    this.changeRoom = this.changeRoom.bind(this);
  }
  changeRoom(event, value){
    const that = this;
    this.setState({
      selectedItem :value
   }, () => {
      that.props.changeRoom(value);
      that.props.toggleNav();
    }); 
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
        style={{overflow: "hidden"}}
        containerStyle={{overflow: "hidden"}}
        docked={false}
      >
      <Menu value= { this.state.selectedItem } onChange={this.changeRoom}>
      {this.props.currentUser.rooms.map((room,index)=>{
        return (<MenuItem primaryText={room.name} value={room._id} key={index}/>);
      })}
      {this.props.currentUser.rooms.length>0 && <Divider />}
      <MenuItem primaryText="創建聊天室" leftIcon={<Add />} 
        onClick={props.toggleAddRoom}/>
        <MenuItem primaryText="進入新聊天室" leftIcon={<PersonAdd />} 
        onClick={props.toggleEnterRoom}/>
        <MenuItem primaryText="修改個人資料" leftIcon={<Edit />} 
        onClick={props.toggleUserSettings}/>        
        <MenuItem primaryText="登出帳號" leftIcon={<Forward />} 
        onClick={props.signOut}/>        
      </Menu>
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