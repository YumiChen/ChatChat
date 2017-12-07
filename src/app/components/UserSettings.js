import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import DeleteUser from "./dialogs/DeleteUser";
import ResetPassword from "./dialogs/ResetPassword";

class UserSettings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: this.props.currentUser.name,
            userNameHint:"",
            showResetPassword: false,
            showDeleteUser: false
        };

        this.setUserName = this.setUserName.bind(this);
        this.updateUserName = this.updateUserName.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleDeleteUser = this.toggleDeleteUser.bind(this);
        this.toggleResetPassword = this.toggleResetPassword.bind(this);
    }
    updateUserName(event){
        event.preventDefault();
        if(this.state.userName===""){
          this.setState({userNameHint: "此欄位不可為空白"});
          return;
        }
        const that = this;
            // insert room
            const api = "user/updateName?_id="+this.props.currentUser._id+"&name="+this.state.userName;
            debug(api);

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
            }).then((data)=>{
              that.props.toggleLoading(false);
              
              that.props.setUser("RESET",data.result);
              that.setState({userName: this.props.currentUser.name, userNameHint: "暱稱修改成功!"});
              if(this.props.currentRoom)that.props.changeRoom(this.props.currentRoom._id);
            });
    }
    setUserName(event, value){
        this.setState({userName: value});
    }
    toggleResetPassword(){
        this.setState({showResetPassword: !this.state.showResetPassword,
                        resetPassword:"",
                        resetPasswordHint:""});
    }
    toggleDeleteUser(){
        this.setState({showDeleteUser: !this.state.showDeleteUser,
            deleteUser:"",
            deleteUserHint:""});
    }
    toggle(){
        this.props.toggle();
        this.setState({ userName: this.props.currentUser.name, userNameHint:""});
    }
    render(){
        const props = this.props,
         actions = [
            <FlatButton
            label="關閉"
            primary={true}
            keyboardFocused={true}
            onClick={this.toggle}
            />
        ];
    return (
        <div>
        <Dialog
        modal={false}
        actions={actions}
        open={props.open}
        onRequestClose={this.toggle}
        bodyStyle={{padding:0}}
        autoDetectWindowHeight={false}
        >
            <Tabs initialSelectedIndex={props.initialSelectedIndex}
            tabTemplateStyle={{textAlign: "center"}}>
                <Tab
                label="個人資料"
                >
                <form onSubmit={this.updateUserName}>
                <TextField
                floatingLabelText="暱稱"
                onChange={this.setUserName}
                value={this.state.userName}
                style={{width: "90%"}}
                />
                <p className="hint" >{this.state.userNameHint}</p>
                    <RaisedButton
                    label="修改"
                    style={{margin: "8px"}}
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.updateUserName}
                    />
                </form>
                </Tab>
                <Tab
                label="帳號管理"
                >
                <RaisedButton
                label="修改密碼"
                primary={true}
                style={{margin: "8px"}}
                keyboardFocused={true}
                onClick={this.toggleResetPassword}
                />
                <br/>
                <RaisedButton
                label="刪除帳號"
                primary={true}
                keyboardFocused={true}
                style={{margin: "8px"}}
                onClick={this.toggleDeleteUser}
                />   
                </Tab>
            </Tabs>
        </Dialog>
        <DeleteUser open={this.state.showDeleteUser} toggle = {this.toggleDeleteUser}/>
        <ResetPassword title="修改密碼" open={this.state.showResetPassword} toggle={this.toggleResetPassword} 
            children={null}/>
    </div>);
    }
};


import currentRoom from "../dispatchers/currentRoom";
import setUser from "../dispatchers/setUser";
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
      changeRoom: currentRoom,
      setUser: setUser,
      toggleLoading: toggleLoading
    },dispatch);
  }

UserSettings = connect(mapStateToProps,mapDispatchToProps)(UserSettings);

module.exports = UserSettings;