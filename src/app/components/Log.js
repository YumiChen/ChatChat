import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import socket from "../socket";
import SendIcon from 'material-ui/svg-icons/content/send';
import EmojiIcon from 'material-ui/svg-icons/image/tag-faces';
import Emoji from "./Emoji";

class Log extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showEmoji: false
        };

        this.sendMsg = this.sendMsg.bind(this);
        this.toggleEmoji = this.toggleEmoji.bind(this);
        this.addEmoji = this.addEmoji.bind(this);
        this.autoScroll = this.autoScroll.bind(this);
    }
    componentDidMount(){
        const that = this;
        if(!socket._callbacks['$chat']){
            socket.on('chat', function(data){
                if(data.roomId === that.props.currentRoom._id){
                    that.props.addLog(data);
                    debug("socket received data");
                }
            });
            debug(socket);
        }
        this.autoScroll();
    }
    componentDidUpdate(){
        debug("componentDidUpdate");
        this.autoScroll();
    }
    sendMsg(event){
        event.preventDefault();

        // Get DOM
        var message = document.getElementById('msg'),
            userId = this.props.currentUser._id,
            userName = this.props.currentUser.name,
            roomId = this.props.currentRoom._id;
        if (message.value === "") return;

        const payload = {
            roomId: roomId,
            _id: userId,
            name: userName,
            msg: message.value
        };

        debug(payload);

        // save message to log
        const api = "a/room/addLog?userId="+userId+"&userName="+userName+"&msg="+msg.value+"&roomId="+this.props.currentRoom._id;
        fetch(encodeURI(api),{
            method: 'get',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: "JWT "+sessionStorage.getItem("token")
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

            message.value = "";
            if(this.state.showEmoji) this.setState({showEmoji: false});
        });
    }
    autoScroll(){
        this.refs.output.scrollTop = output.scrollHeight;   
    }
    toggleEmoji(){
        this.setState({showEmoji: !this.state.showEmoji},()=>{
            if(this.state.showEmoji){
                setTimeout(()=>{
                    this.autoScroll();
                },600);
            }
        });
    }
    addEmoji(event){
        debug(document.getElementById('msg').innerHTML);
        document.getElementById('msg').value += event.target.innerHTML;
    }
    render(){
        const id = this.props.currentUser._id;
        return (
        <div className="log">
            <div id="output" ref ="output" style={this.state.showEmoji?{height: "calc(calc(100% - 18rem) - 64px)"}:{height: "calc(calc(100% - 3rem) - 64px)"}}>
                {this.props.currentRoom.log.map((data,index)=>{
                    if(data._id == id) return (<p className="ownMsg" key={index}>{data.msg}</p>);
                    return (<div key={index}><small className="msgName">{data.name}</small><p className="msg" key={index}>{data.msg}</p></div>);
                })}
            </div>
            <div className="log_input" style={{height: "3rem"}}>
                <TextField
                    id = "msg"
                    hintText=""
                    style={{width: "calc(100vw - 7rem)"}}
                />
                <EmojiIcon
                    onClick={this.toggleEmoji}
                    style={{margin: "0.2rem 0.5rem", cursor:"pointer"}}
                />
                <SendIcon
                    onClick={this.sendMsg}
                    style={{margin: "0.2rem 0.5rem", cursor:"pointer"}}
                />
                </div>
            <Emoji toggle={this.toggleEmoji} addEmoji={this.addEmoji}/>
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