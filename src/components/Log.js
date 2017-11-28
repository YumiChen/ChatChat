// dispatcher: currentRoom
// state: currentRoom

import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import io from 'socket.io-client';

// Make connection
var socket = io.connect('http://localhost:7000');

class Log extends React.Component{
    constructor(props){
        super(props);
        this.sendMsg = this.sendMsg.bind(this);
    }
    componentDidMount(){
        var output = document.getElementById('output'), that = this;
        socket.on('chat', function(data){
            console.log(data);
            // output.innerHTML += '<p class="msg">' + data.message + '</p>';
            that.props.addLog(data);
        });
    }
    sendMsg(event){
        event.preventDefault();

        // Get DOM
        var message = document.getElementById('msg'),
            userId = this.props.currentUser._id,
            userName = this.props.currentUser.name;
        if (message.value === "") return;
        
        // send data to server
        socket.emit('chat', {
            _id: userId,
            name: userName,
            msg: message.value
        });
        // save message to log
        const api = "room/addLog?userId="+userId+"&userName="+"&msg="+msg.value+"&roomId="+this.props.currentRoom._id;
        fetch(encodeURI(api)).then((data)=>{
            return data.json();
        }).then(({success})=>{
            if(!success){
                // handle error
            }
        });

        message.value = "";
    }
    render(){
        console.log(this.props.currentRoom.log);
        return (
        <div className="log">
            <div id="output">
                {this.props.currentRoom.log.map((data)=>{
                    return (<p className="msg"><small>{data.name}</small><br/>{data.msg}</p>);
                })}
            </div>
            <div className="log_input">
                <TextField
                    id = "msg"
                    hintText=""
                />
                <RaisedButton label="SEND" primary={true} 
                    onClick={this.sendMsg}
                    style={{margin: "0.2rem 1rem"}}/>
            </div>
        </div>);
    }
  };

  import handleRoom from "../dispatchers/handleRooms";
  import currentRoom from "../dispatchers/currentRoom";
  import setUser from "../dispatchers/setUser";
  import addLog from "../dispatchers/addLog";
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
        setUser: setUser,
        addLog: addLog
      },dispatch);
    }
  
  Log = connect(mapStateToProps,mapDispatchToProps)(Log);
  
  export default Log;