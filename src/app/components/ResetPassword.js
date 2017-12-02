import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

class ResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            resetPassword: "",
            resetPasswordHint: ""
        };

        this.resetPassword = this.resetPassword.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setResetPassword = this.setResetPassword.bind(this);
    }
    resetPassword(){
        if(this.state.resetPassword===""){
            this.setState({resetPasswordHint: "此欄位不可為空白"});
            return;
        }
    
        const that = this;
        const api = "a/sendResetPasswordMail";
        debug(api);
        fetch(encodeURI(api),{
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: "JWT "+sessionStorage.getItem("token")
            },
            body: 
            JSON.stringify(
                {
                    _id: that.props.currentUser?that.props.currentUser._id:that.props._id,
                    email: that.state.resetPassword
                })
          }).then((data)=>{
          return data.json();
        }).then((data)=>{
            if(data.success){
                that.setState({resetPassword: "", resetPasswordHint: "密碼重設信件已寄至您的信箱"});
            }else{
                // handle error
                debug(data.err);
                if(data.err == "wrongEmail"){
                    this.setState({resetPasswordHint: "信箱錯誤"});
                }else this.setState({resetPasswordHint: "某處發生錯誤,請稍後再嘗試"});
            }
        });
    }
    setResetPassword(event, value){
        this.setState({resetPassword: value});
    }
    toggle(){
        this.props.toggle();
        this.setState({ resetPassword: "", resetPasswordHint:""});
    }
    render(){
        const props = this.props,
        resetPasswordActions = [
            <FlatButton
            label="取消"
            primary={true}
            keyboardFocused={true}
            onClick={this.toggle}
            />,
            <FlatButton
            label="送出"
            primary={true}
            keyboardFocused={true}
            onClick={this.resetPassword}
            />
        ];
    return (
        <Dialog
        title={this.props.title}
        actions={resetPasswordActions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.toggle}
        titleStyle={{padding: "18px 20px 0 20px", fontWeight: "bold"}}
        contentStyle={{maxWidth: "none"}}
        >
        {this.props.children}
        <TextField
        floatingLabelText="請輸入信箱..."
        onChange={this.setResetPassword}
        value={this.state.resetPassword}
        style={{width: "90%"}}
        />
        <p className="hint">{this.state.resetPasswordHint}</p>
        </Dialog>
        );
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

ResetPassword = connect(mapStateToProps,mapDispatchToProps)(ResetPassword);

module.exports = ResetPassword;