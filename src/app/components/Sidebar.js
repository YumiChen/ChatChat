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
    this.signOut = this.signOut.bind(this);
  }
  changeRoom(event, obj, index){
      if(!obj.props.value) return;
      this.props.changeRoom(obj.props.value);
      this.props.toggle();
  }
  signOut(){
    this.props.setUser("LOGOUT");
    this.props.changeRoom(null);
    this.props.toggle();
  }
  render(){
    const props = this.props;
    return (
      <div className="sidebar">
      <Drawer
        docked={false}
        width={200}
        open={props.open}
        onRequestChange={props.toggle}
        style={{overflow: "hidden"}}
        containerStyle={{overflow: "hidden"}}
        docked={false}
      >
      <Menu value= { this.state.selectedItem } onItemTouchTap={this.changeRoom}>
      {this.props.currentUser.rooms.map((room,index)=>{
        return (<MenuItem primaryText={room.name} value={room._id} key={index} 
                  style={props.currentRoom?( props.currentRoom._id == room._id?{color:"brown"}:null):null}  
                />);
      })}
      {this.props.currentUser.rooms.length>0 && <Divider />}
      <MenuItem primaryText="創建聊天室" leftIcon={<Add />} 
        onClick={props.toggleAddRoom}/>
        <MenuItem primaryText="進入聊天室" leftIcon={<PersonAdd />} 
        onClick={props.toggleEnterRoom}/>
        <MenuItem primaryText="帳號管理" leftIcon={<Edit />} 
        onClick={props.toggleUserSettings}/>        
        <MenuItem primaryText="登出帳號" leftIcon={<Forward />} 
        onClick={this.signOut}/>        
      </Menu>
    </Drawer>
  
      </div>
    )
  }
};
  
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
        changeRoom: currentRoom,
        setUser: setUser
      },dispatch);
    }
  
  Sidebar = connect(mapStateToProps,mapDispatchToProps)(Sidebar);
  

  export default Sidebar;