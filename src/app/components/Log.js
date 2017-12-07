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
        this.onFocus = this.onFocus.bind(this);
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
        const that = this;
        debug("componentDidUpdate");
        setTimeout(function(){
            that.autoScroll();
        },600);
    }
    sendMsg(event){
        event.preventDefault();

        // Get DOM
        var message = document.getElementById('msg'),
            userId = this.props.currentUser._id,
            userName = this.props.currentUser.name,
            roomId = this.props.currentRoom._id,
            that = this;
        if (message.value === "") return;

        const payload = {
            roomId: roomId,
            _id: userId,
            name: userName,
            msg: message.value,
            time: new Date()
        };

        debug(payload);

        // save message to log
        const api = "room/addLog?userId="+userId+"&userName="+userName+"&msg="+msg.value+"&roomId="+this.props.currentRoom._id;
        this.props.toggleLoading(true);
        fetch(encodeURI(api),{
            method: 'get',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: "JWT "+sessionStorage.getItem("token")
            },
            body: undefined
          }).then((data)=>{
            if(data.statusText=="Unauthorized") return {success: false};
            return data.json();
        }).then(({success})=>{
            that.props.toggleLoading(false);
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
    onFocus(){
        this.setState({showEmoji: false});
    }
    render(){
        let time, date, lastDate, temp, log = [], i = -1;
        const id = this.props.currentUser._id;
        this.props.currentRoom.log.forEach((data,index)=>{
            date = new Date(data.time);
            // check if date should be shown
            if(!lastDate){
                lastDate = date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate();
                log.push(<p className="date" key={i++}>{"----- " + lastDate + " -----"}</p>);
            }else if(lastDate!= (temp = date.getFullYear() + " / " + (date.getMonth() + 1) + " / " + date.getDate())){
                lastDate = temp;
                log.push(<p className="date" key={i++}>{"----- " + lastDate + " -----"}</p>);
            }
            // render msgs
            time = date.getHours()+":"+ (date.getMinutes() < 10 ? "0"+date.getMinutes():date.getMinutes());
            if(data._id=="System"){
                // newUser
                log.push (<p className="systemMsg" key={i++}>{data.msg + " 加入聊天室囉"}</p>);
            }else{ 
                if(data._id == id) log.push (<div key={i++}><p className="ownMsg">{data.msg}</p><p className="time ownTime">{time}</p></div>);
                else log.push (<div key={i++}><small className="msgName">{data.name}</small><p className="msg">{data.msg}</p><p className="time">{time}</p></div>);
            }
        })
        return (
        <div className="log">
            <div id="output" ref ="output" style={this.state.showEmoji?{height: "calc(100% - 320px)"}:{height: "calc(100% - 80px)"}}>
                {log}
            </div>
            <form className="log_input" style={{height: "80px"}} onSubmit={this.sendMsg}>
                <TextField
                    id = "msg"
                    hintText=""
                    style={{width: "calc(100vw - 112px)"}}
                    onFocus = {mobileAndTabletcheck()? this.onFocus:null}
                />
                <EmojiIcon
                    onClick={this.toggleEmoji}
                    style={{margin: "3px 8px", cursor:"pointer"}}
                    className="noSelect"
                />
                <SendIcon
                    onClick={this.sendMsg}
                    style={{margin: "3px 8px", cursor:"pointer"}}
                    className="noSelect"
                />
                </form>
            <Emoji toggle={this.toggleEmoji} addEmoji={this.addEmoji}/>
        </div>);
    }
  };

//   multiLine={true}
//   rowsMax={1}

  import addLog from "../dispatchers/addLog";
  import {bindActionCreators} from "redux";
  import {connect} from "react-redux";
  import toggleLoading from "../dispatchers/toggleLoading";

  const mapStateToProps=(state)=>{
      return {currentUser: state.currentUser,
              currentRoom: state.currentRoom
             };
    }
    const mapDispatchToProps = (dispatch)=>{
      return bindActionCreators({
        addLog: addLog,
        toggleLoading: toggleLoading
      },dispatch);
    }
  
  Log = connect(mapStateToProps,mapDispatchToProps)(Log);
  
  export default Log;