// dispatcher: rooms
// state: currentUser

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import AppBar from 'material-ui/AppBar';
import Sidebar from "./Sidebar";

class Nav extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const options = ["Members","Invitation code","Sign out"];
        const menuItems= options.map((option,index)=>{
            return (<MenuItem primaryText={option} onClick={()=>{this.props.toggleRoomSettings(index)}} key={index}/>);
        }),
        settingsMenu = (    
            <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
            {menuItems}
          </IconMenu>);
        return (
                <AppBar
                    title="ChatChat"
                    iconClassNameRight={this.props.currentRoom?"muidocs-icon-navigation-expand-more":null}
                    iconElementRight={this.props.currentRoom?settingsMenu:null}
                    onLeftIconButtonTouchTap={this.props.currentUser?this.props.toggleNav:null}
                />
        );
    }
}

import {connect} from "react-redux";

const mapStateToProps=(state)=>{
    return {currentUser: state.currentUser,
            currentRoom: state.currentRoom};
  }


Nav = connect(mapStateToProps,null)(Nav);

export default Nav;
