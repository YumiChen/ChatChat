import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import TextSMSIcon from 'material-ui/svg-icons/communication/textsms';
import AppBar from 'material-ui/AppBar';
import Sidebar from "./Sidebar";
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state = { showLeaveRoom: false};
        
        this.toggleLeaveRoom = this.toggleLeaveRoom.bind(this);
        this.toIndex = this.toIndex.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
    }
    toggleLeaveRoom(){
        this.setState({ showLeaveRoom: !this.state.showLeaveRoom});
    }
    toIndex(){
        if(this.props.currentRoom!=null) this.props.changeRoom(null);
        this.props.toggleLoading(false);
    }
    leaveRoom(){
        const currentRoom = this.props.currentRoom,
              currentUser = this.props.currentUser,
              that = this,
              api = "user/leaveRoom?userId="+currentUser._id+"&userName="+currentUser.name+"&roomId="+currentRoom._id+"&roomName="+currentRoom.name;
        
        debug("JWT "+sessionStorage.getItem("token"));
        
        this.props.toggleLoading(true);
        fetch(encodeURI(api),{
            method: 'get',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: "JWT "+sessionStorage.getItem("token")
            },
            body: undefined
          })
        .then((data)=>{
          if(data.statusText=="Unauthorized") return {success: false};
          return data.json();
        }).then(({success})=>{
            this.props.toggleLoading(false);
          if(!success) {
            // handle error

          }else{
            this.toggleLeaveRoom();
            // splice current room
            this.props.handleRoom("LEAVEROOM",this.props.currentRoom._id,this.props.currentRoom.name);
            // set current room to null
            this.props.changeRoom(null);
          }
        });

    }
    render(){
        const options = ["聊天室成員","取得邀請碼","邀請成員"];
        const menuItems= options.map((option,index)=>{
            return (<MenuItem primaryText={option} onClick={()=>{this.props.toggleRoomSettings(index)}} key={index}/>);
        }),
        settingsMenu = (    
            <IconMenu
            iconButtonElement={<IconButton iconStyle={{fill:"#795548",color:"#795548"}}><MoreVertIcon fill="#795548"/></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
            {menuItems}
            <MenuItem primaryText="離開房間" onClick={this.toggleLeaveRoom}/>
          </IconMenu>),
          leftIcon_loggedIn = (<IconButton iconStyle={{fill:"#795548",color:"#795548"}}><MenuIcon fill="#795548"/></IconButton>),
          leftIcon = (<IconButton iconStyle={{fill:"#795548",color:"#795548"}}><TextSMSIcon fill="#795548"/></IconButton>),
          actions = [
            <FlatButton
            label="取消"
            primary={true}
            keyboardFocused={true}
            onClick={this.toggleLeaveRoom}
            />,
            <FlatButton
            label="確定"
            primary={true}
            keyboardFocused={true}
            onClick={this.leaveRoom}
            />
        ];
        return (
                <div>
                <AppBar
                    title={<span style={{cursor: "pointer"}}>ChatChat</span>}
                    onTitleTouchTap={this.toIndex}
                    iconElementRight={this.props.currentRoom?settingsMenu:null}
                    iconElementLeft={this.props.currentUser?leftIcon_loggedIn:leftIcon}
                    onLeftIconButtonTouchTap={this.props.currentUser?this.props.toggleNav:null}
                    style = {{backgroundColor: "none", boxShadow: "none", color: "#795548"}}
                    titleStyle = {{color: "#795548", fontWeight: "bold"}}
                />
                <Dialog
                title="您確定要離開房間嗎?"
                titleStyle={{textAlign: "center", marginBottom: 0}}
                actionsContainerStyle={{textAlign: "center"}}
                actions={actions}
                modal={false}
                open={this.state.showLeaveRoom}
                onRequestClose={this.toggleLeaveRoom}
                titleStyle={{padding: "18px 20px", fontWeight: "bold"}}
                />
                </div>
        );
    }
}

import {connect} from "react-redux";
import currentRoom from "../dispatchers/currentRoom";
import {bindActionCreators} from "redux";
import handleRoom from "../dispatchers/handleRooms";
import toggleLoading from "../dispatchers/toggleLoading";

const mapStateToProps=(state)=>{
    return {currentUser: state.currentUser,
            currentRoom: state.currentRoom};
  }
  const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        handleRoom: handleRoom,
      changeRoom: currentRoom,
      toggleLoading: toggleLoading
    },dispatch);
  }

Nav = connect(mapStateToProps,mapDispatchToProps)(Nav);

export default Nav;
