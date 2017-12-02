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
      this.copy = this.copy.bind(this);

    }
    copy(){
      let copyArea = this.password; 
      copyArea.select();
      document.execCommand("Copy"); 
    }
    render(){
      const style = {margin: 5};
      const props = this.props,
            actions = [
              <FlatButton
              label="關閉"
              primary={true}
              keyboardFocused={true}
              onClick={props.toggle}
              />
          ];  

    return (
        <Dialog
            modal={false}
            actions={actions}
            open={props.open}
            onRequestClose={props.toggle}
            bodyStyle={{padding:0}}
        >
        <Tabs initialSelectedIndex={props.initialSelectedIndex}>
        <Tab
          label="聊天室成員"
        >
          <List>
            {this.props.currentRoom.members.map((member,index)=>{
              return (<ListItem primaryText={member.name} 
                                secondaryText={"@"+member._id}
                                key={index}/>);
            })}
        </List>   
        </Tab>
        <Tab
          label="邀請碼"
        >
        <div style={{textAlign: "center"}}>
          <p>請將房間邀請碼分享給您想邀請的朋友</p>
          <input 
            ref={ password=>this.password=password }
            value = {this.props.currentRoom._id}
            className = "showRoomPassword"
            readOnly
          />
          <br/>
          <RaisedButton label="COPY" style={style} primary={true} onClick={this.copy}/>     
        </div>  
        </Tab>
      </Tabs>
      </Dialog>
    );
    }
}


import {connect} from "react-redux";

const mapStateToProps=(state)=>{
    return {
            currentRoom: state.currentRoom
           };
  }


RoomSettings = connect(mapStateToProps,null)(RoomSettings);


module.exports = RoomSettings;