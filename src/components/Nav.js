// dispatcher: rooms
// state: currentUser

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import TextSMSIcon from 'material-ui/svg-icons/communication/textsms';
import AppBar from 'material-ui/AppBar';
import Sidebar from "./Sidebar";

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.toIndex = this.toIndex.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
    }
    toIndex(){
        if(this.props.currentRoom!=null) this.props.changeRoom(null);
    }
    leaveRoom(){
        const currentRoom = this.props.currentRoom,
              currentUser = this.props.currentUser,
              api = "user/leaveRoom?userId="+currentUser._id+"&userName="+currentUser.name+"&roomId="+currentRoom._id+"&roomName="+currentRoom.name;
        console.log(api);
        fetch(encodeURI(api))
        .then((data)=>{
          return data.json();
        }).then(({success})=>{
          if(!success) {
            // handle error
          }
        });
        // splice current room
        this.props.handleRoom("LEAVEROOM",this.props.currentRoom._id,this.props.currentRoom.name);
        // set current room to null
        this.props.changeRoom(null);
    }
    render(){
        const options = ["聊天室成員","取得邀請碼"];
        const menuItems= options.map((option,index)=>{
            return (<MenuItem primaryText={option} onClick={()=>{this.props.toggleRoomSettings(index)}} key={index}/>);
        }),
        settingsMenu = (    
            <IconMenu
            iconButtonElement={<IconButton iconStyle={{fill:"#6d4c41",color:"#6d4c41"}}><MoreVertIcon fill="#6d4c41"/></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
            {menuItems}
            <MenuItem primaryText="離開房間" onClick={this.leaveRoom}/>
          </IconMenu>),
          leftIcon_loggedIn = (<IconButton iconStyle={{fill:"#6d4c41",color:"#6d4c41"}}><MenuIcon fill="#6d4c41"/></IconButton>),
          leftIcon = (<IconButton iconStyle={{fill:"#6d4c41",color:"#6d4c41"}}><TextSMSIcon fill="#6d4c41"/></IconButton>);
        return (
                <AppBar
                    title={<span style={{cursor: "pointer"}}>ChatChat</span>}
                    onTitleTouchTap={this.toIndex}
                    iconElementRight={this.props.currentRoom?settingsMenu:null}
                    iconElementLeft={this.props.currentUser?leftIcon_loggedIn:leftIcon}
                    onLeftIconButtonTouchTap={this.props.currentUser?this.props.toggleNav:null}
                    style = {{backgroundColor: "none", boxShadow: "none", color: "#6d4c41"}}
                    titleStyle = {{color: "#6d4c41", fontWeight: "bold"}}
                />
        );
    }
}

import {connect} from "react-redux";
import currentRoom from "../dispatchers/currentRoom";
import {bindActionCreators} from "redux";
import handleRoom from "../dispatchers/handleRooms";

const mapStateToProps=(state)=>{
    return {currentUser: state.currentUser,
            currentRoom: state.currentRoom};
  }
  const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        handleRoom: handleRoom,
      changeRoom: currentRoom
    },dispatch);
  }

Nav = connect(mapStateToProps,mapDispatchToProps)(Nav);

export default Nav;
