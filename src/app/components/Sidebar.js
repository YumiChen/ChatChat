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
      const msg = document.querySelector("#msg");
      if(msg) msg.value = "";
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
    let rooms = props.currentUser.rooms.map((room,index)=>{
            return (<MenuItem primaryText={room.name} value={room._id} key={index} 
                      style={props.currentRoom?( props.currentRoom._id == room._id?{color:"brown"}:null):null}  
                    />);
          });

    if(rooms.length===0) rooms = <MenuItem primaryText="創建新聊天室ヽ(*^ω^)ﾉ" onClick={props.toggleAddRoom}/>;
    return (
      <div className="sidebar">
      <Drawer
        docked={false}
        width={220}
        open={props.open}
        onRequestChange={props.toggle}
        style={{overflowX: "hidden"}}
        containerStyle={{overflowX: "hidden"}}
        docked={false}
      >
      <Menu value= { this.state.selectedItem } onItemTouchTap={this.changeRoom} style={{height: "calc(100% - 335px)", overflowY:"auto"}}>
      {rooms}    
      </Menu>
      <Menu style={{position:"absolute",height: "250px", bottom: "100px"}}>
      <Divider/>
      <MenuItem primaryText="創建新聊天室" leftIcon={<Add />} 
        onClick={props.toggleAddRoom}/>
        <MenuItem primaryText="進入新聊天室" leftIcon={<PersonAdd />} 
        onClick={props.toggleEnterRoom}/>
        <MenuItem primaryText="帳號資料管理" leftIcon={<Edit />} 
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