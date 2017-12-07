import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FileFolder from 'material-ui/svg-icons/file/folder';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

class RoomSettings extends React.Component{
    constructor(props){
      super(props);
      this.copy = this.copy.bind(this);
      this.invite = this.invite.bind(this);
      this.search = this.search.bind(this);
      this.setTerm = this.setTerm.bind(this);
      this.toggle = this.toggle.bind(this);
      this.state = {
        data: [],
        term: "",
        hint: ""
      }
    }
    copy(){
      let copyArea = this.password; 
      copyArea.select();
      document.execCommand("Copy"); 
    }
    setTerm(term, index){
      this.setState({term: this.state.data[index]._id});
    }
    invite(){
      if(this.state.term === ""){
        this.setState({hint: "此欄位不可為空白"});
        return;
      }

      // check if the user is already in 
      let index = this.props.currentRoom.members.findIndex((el)=>{
        return el._id == this.state.term;
      });
      debug(index);
      if(index >= 0){
        this.setState({hint: "此會員已在聊天室內"})
        return;
      }

      // userId, password
      const that = this, api = "user/addToRoom?userId="+this.state.term+"&password="+this.props.currentRoom._id;
      debug(api);
      this.props.toggleLoading(true);
      fetch(api,{
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
      }).then((data)=>{
        that.props.toggleLoading(false);
        if(data.success) {
          that.setState({hint: "該會員已被成功加入聊天室!"})
          that.props.changeRoom(data.result);
        }
        else{
          switch(data.err){
            case "noExistedUser":
              that.setState({hint: "該會員不存在"})
              break;
            default:
              that.setState({hint: "某處發生了錯誤,請稍後再嘗試"})
          }
        }
      });
    }
    search(term){
      const that = this;
      this.setState({term: term},()=>{
        if(this.state.term === "") return;
        const api = "user/search?term="+this.state.term;
        debug(api);

        this.props.toggleLoading(true);
        fetch(api,{
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
        }).then((data)=>{
          that.props.toggleLoading(false);
          if(data.success) that.setState({data: data.result});
          else this.setState({hint: "某處發生了錯誤,請稍後再嘗試"})
        });
      });
    }
    toggle(){
      this.props.toggle();
      this.setState({data: [], hint:"", term: ""});
    }
    render(){
      const style = {margin: "16px"},
            titleStyle = {padding: "0 16px"},
            props = this.props,
            actions = [
              <FlatButton
              label="關閉"
              primary={true}
              keyboardFocused={true}
              onClick={this.toggle}
              />
            ];
      let dataSource = this.state.data.map((data,index)=>{
        return ({
          text: data._id,
          value: <MenuItem
          key={index}
          primaryText= {data.name}
          secondaryText={"@"+data._id}
        />});
      });  

    console.log(dataSource);
    return (
        <Dialog
            modal={false}
            actions={actions}
            open={props.open}
            onRequestClose={this.toggle}
            bodyStyle={{padding:0}}
            autoDetectWindowHeight={false}
        >
        <Tabs initialSelectedIndex={props.initialSelectedIndex}>
        <Tab
          label="聊天室成員"
        >
          <List style={{maxHeight: "240px", overflowY:"auto"}}>
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
          <p style={titleStyle}>請將房間邀請碼分享給您想邀請的朋友</p>
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
        <Tab label="邀請成員">
          <div style={{textAlign: "center"}}>
            <p style={titleStyle}>請輸入該會員帳號</p>
            <AutoComplete
              floatingLabelText="請輸入帳號或暱稱搜尋..."
              filter={AutoComplete.noFilter}
              openOnFocus={true}
              dataSource={dataSource}
              value = {this.state.term}
              onUpdateInput = {this.search}
              onNewRequest = {this.setTerm}
              style = {{maxWidth: "90%"}}
              textFieldStyle={{width: "100%"}}
            />
            <RaisedButton label="送出" style={style} primary={true} onClick={this.invite}/>     
            <p className="hint">{this.state.hint}</p>
          </div>  
        </Tab>
      </Tabs>
      </Dialog>
    );
    }
}


import {connect} from "react-redux";
import currentRoom from "../dispatchers/currentRoom";
import {bindActionCreators} from "redux";
import toggleLoading from "../dispatchers/toggleLoading";

const mapStateToProps=(state)=>{
    return {
            currentRoom: state.currentRoom
           };
  }
  const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
      changeRoom: currentRoom,
      toggleLoading: toggleLoading
    },dispatch);
  }


RoomSettings = connect(mapStateToProps,mapDispatchToProps)(RoomSettings);


module.exports = RoomSettings;