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
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementRight={settingsMenu}
                    onLeftIconButtonTouchTap={this.props.toggleNav}
                />
        );
    }
}


export default Nav;
