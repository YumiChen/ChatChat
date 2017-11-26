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
        const settingsMenu = (    
            <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
            <MenuItem primaryText="Members" />
            <MenuItem primaryText="Invitation code" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
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
