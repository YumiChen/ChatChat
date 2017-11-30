import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import socket from "../socket";

class Log extends React.Component{
    constructor(props){
        super(props);
        this.sendMsg = this.sendMsg.bind(this);
    }
    componentDidMount(){
        var output = document.getElementById('output'), that = this;
        if(!socket._callbacks.$chat){
            socket.on('chat', function(data){
                that.props.addLog(data);
                console.log("socket received data");
            });
        }
    }
    sendMsg(event){
        event.preventDefault();

        // Get DOM
        var message = document.getElementById('msg'),
            userId = this.props.currentUser._id,
            userName = this.props.currentUser.name;
        if (message.value === "") return;

        const payload = {
            _id: userId,
            name: userName,
            msg: message.value
        };

        // save message to log
        const api = "room/addLog?userId="+userId+"&userName="+userName+"&msg="+msg.value+"&roomId="+this.props.currentRoom._id;
        fetch(encodeURI(api),{
            method: 'get',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              auth: sessionStorage.getItem("token")
            },
            body: undefined
          }).then((data)=>{
            return data.json();
        }).then(({success})=>{
            if(!success){
                // handle error
            }
            // emit message
            socket.emit('chat', payload);
        });

        message.value = "";
    }
    render(){
        const id = this.props.currentUser._id;
        return (
        <div className="log">
            <div id="output">
                {this.props.currentRoom.log.map((data,index)=>{
                    if(data._id == id) return (<p className="ownMsg" key={index}>{data.msg}</p>);
                    return (<div key={index}><small className="msgName">{data.name}</small><p className="msg" key={index}>{data.msg}</p></div>);
                })}
            </div>
            <div className="log_input">
                <TextField
                    id = "msg"
                    hintText=""
                    style={{width: "calc(100vw - 8.5rem)"}}
                />
                <RaisedButton label="SEND" primary={true} 
                    onClick={this.sendMsg}
                    style={{margin: "0.2rem 1rem"}}/>
            </div>
        </div>);
    }
  };

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
        addLog: addLog
      },dispatch);
    }
  
  Log = connect(mapStateToProps,mapDispatchToProps)(Log);
  
  export default Log;