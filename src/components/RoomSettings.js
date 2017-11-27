import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import RaisedButton from 'material-ui/RaisedButton';


class RoomSettings extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      const style = {margin: 5};
      const props = this.props,
            actions = [
              <FlatButton
              label="取消"
              primary={true}
              keyboardFocused={true}
              onClick={props.toggleRoomSettings}
              />
          ];  

    return (
        <Dialog
            modal={false}
            actions={actions}
            open={props.open}
            onRequestClose={props.toggleRoomSettings}
            bodyStyle={{padding:0}}
        >
        <Tabs initialSelectedIndex={props.initialSelectedIndex}>
        <Tab
        icon={<MapsPersonPin />}
          label="Member"
        >
          <List>
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar src="images/uxceo-128.jpg" />
            }
          >
            Image Avatar
          </ListItem>
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar
                src="images/uxceo-128.jpg"
                size={30}
                style={style}
              />
            }
          >
            Image Avatar with custom size
          </ListItem>
          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />
            }
          >
            FontIcon Avatar
          </ListItem>
        </List>
        <RaisedButton label="Leave Room" style={style} secondary={true}/>    
        </Tab>
        <Tab
          icon={<MapsPersonPin />}
          label="Code"
        >
        <input type="text" value="1231321231" readOnly/>
        <RaisedButton label="COPY" style={style} primary={true}/>       
        </Tab>
        <Tab
        icon={<MapsPersonPin />}
        label="Signout"
        >
        <RaisedButton label="Signout" style={style} secondary={true}/>      
        </Tab>
      </Tabs>
      </Dialog>
    );
    }
}

module.exports = RoomSettings;