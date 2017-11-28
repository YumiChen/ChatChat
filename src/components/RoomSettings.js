// currentRoom, currentUser

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
      this.signOut = this.signOut.bind(this);
    }
    signOut(){
      this.props.setUser("LOGOUT");
    }
    copy(){

    }
    leaveRoom(){
      const currentRoom = this.props.currentRoom,
            currentUser = this.props.currentUser;
      fetch("user/leaveRoom?userId="+currentUser._id+"&userName="+currentUser.name+"&roomId="+currentRoom._id+"&roomName="+currentRoom.name)
      .then((data)=>{
        return data.json();
      }).then(({succes})=>{
        if(!success) {
          // handle error
        }
      });
      // splice current room
      this.props.handleRoom(this.props.currentRoom._id,this.props.currentRoom.name);
      // set current room to null
      this.props.changeRoom(null);
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
            {this.props.currentRoom.members.map((member)=>{
              return (<ListItem primaryText={member.name}/>);
            })}
        </List>
        <RaisedButton label="Leave Room" style={style} secondary={true}/>    
        </Tab>
        <Tab
          icon={<MapsPersonPin />}
          label="Code"
        >
        <input type="text" value={this.props.currentRoom._id} readOnly/>
        <RaisedButton label="COPY" style={style} primary={true}/>       
        </Tab>
        <Tab
        icon={<MapsPersonPin />}
        label="Signout"
        >
        <RaisedButton label="Signout" style={style} secondary={true} onClick={this.signOut}/>      
        </Tab>
      </Tabs>
      </Dialog>
    );
    }
}

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

RoomSettings = connect(mapStateToProps,mapDispatchToProps)(RoomSettings);


module.exports = RoomSettings;