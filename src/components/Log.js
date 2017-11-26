import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import io from 'socket.io-client';

// Make connection
var socket = io.connect('http://localhost:8000');

class Log extends React.Component{
    constructor(props){
        super(props);
        this.sendMsg = this.sendMsg.bind(this);
    }
    componentDidMount(){
        var output = document.getElementById('output');
        socket.on('chat', function(data){
            output.innerHTML += '<p class="msg">' + data.message + '</p>';
        });
    }
    sendMsg(event){
        event.preventDefault();

        // Get DOM
        var message = document.getElementById('msg');
        if (message.value === "") return;
        // send data to server
        socket.emit('chat', {
            message: message.value
        });

        message.value = "";
    }
    render(){
        return (
        <div className="log">
            <div id="output">
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
  
  export default Log;