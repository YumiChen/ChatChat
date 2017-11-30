import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class UserSettings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: this.props.currentUser.name,
            userNameHint:"",
            resetPassword: "",
            resetPasswordHint: "",
            showResetPassword: false
        };

        this.setUserName = this.setUserName.bind(this);
        this.updateUserName = this.updateUserName.bind(this);
        this.toggleResetPassword = this.toggleResetPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    updateUserName(){
        if(this.state.userName===""){
          this.setState({userNameHint: "此欄位不可為空白"});
          return;
        }
        const that = this;
            this.props.toggle();
            // insert room
            const api = "user/updateName?_id="+this.props.currentUser._id+"&name="+this.state.userName;
            console.log(api);
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
            }).then((data)=>{
              console.log(data);
              that.props.setUser("RESET",data.result);
              if(this.props.currentRoom)that.props.changeRoom(this.props.currentRoom._id);
            });
    }
    resetPassword(){
        if(this.state.resetPassword===""){
            this.setState({resetPasswordHint: "此欄位不可為空白"});
            return;
        }
    }
    setUserName(event, value){
        this.setState({userName: value});
    }
    setResetPassword(event, value){
        this.setState({resetPassword: value});
    }
    toggleResetPassword(){
        this.setState({showResetPassword: !this.state.showResetPassword,
                        resetPassword:"",
                        resetPasswordHint:""});
    }
    toggle(){
        this.props.toggle();
        this.setState({ userName: this.props.currentUser.name, userNameHint:""});
    }
    render(){
        const actions = [
            <FlatButton
            label="取消"
            primary={true}
            keyboardFocused={true}
            onClick={this.toggle}
            />,
            <FlatButton
            label="修改"
            primary={true}
            keyboardFocused={true}
            onClick={this.updateUserName}
            />
        ], resetPasswordActions = [
            <FlatButton
            label="取消"
            primary={true}
            keyboardFocused={true}
            onClick={this.toggleResetPassword}
            />,
            <FlatButton
            label="送出"
            primary={true}
            keyboardFocused={true}
            onClick={this.resetPassword}
            />
        ];
    return (
        <div>
        <Dialog
        title="修改個人資料"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.toggle}
        titleStyle={{padding: "18px 20px", fontWeight: "bold"}}
      >
        <TextField
        floatingLabelText="暱稱"
        onChange={this.setUserName}
        value={this.state.userName}
        />
        <p className="hint" >{this.state.userNameHint}</p>
        <span onClick={this.toggleResetPassword}>若需修改密碼請點此</span>        
      </Dialog>
        <Dialog
        title="修改密碼"
        actions={resetPasswordActions}
        modal={false}
        open={this.state.showResetPassword}
        onRequestClose={this.toggleResetPassword}
        titleStyle={{padding: "18px 20px", fontWeight: "bold"}}
        contentStyle={{width: "55%", maxWidth: "none"}}
        >
        <TextField
        floatingLabelText="請輸入信箱..."
        onChange={this.setResetPassword}
        value={this.state.resetPassword}
        />
        <p className="hint">{this.state.resetPasswordHint}</p>
        </Dialog>
    </div>);
    }
};



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
      changeRoom: currentRoom,
      setUser: setUser
    },dispatch);
  }

UserSettings = connect(mapStateToProps,mapDispatchToProps)(UserSettings);

module.exports = UserSettings;