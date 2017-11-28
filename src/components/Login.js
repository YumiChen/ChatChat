// dispatcher: currentUser

import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={login: true, email:"",password:"",emailMsg:"",passwordMsg:""};

        this.changeAction = this.changeAction.bind(this);
        this.onChange = this.onChange.bind(this);
        this.signUp = this.signUp.bind(this);
        this.login = this.login.bind(this);
    }
    changeAction(){
        this.setState({login: !this.state.login});
    }
    login(){
      const that = this, api = "user/login?_id="+this.state.email+"&password="+this.state.password;
      fetch(encodeURI(api)).then((data)=>{
        return data.json();
      }).then((data)=>{
        // set currentUser as data got from response
        if(data.success) that.props.setUser("LOGIN",data.result);
        else{
          switch(data.error){
            // handlr error
          }
        }
      });
    }
    signUp(){
      const that = this, api = "user/insert?_id="+this.state.email+"&password="+this.state.password;
      fetch(encodeURI(api)).then((data)=>{
        return data.json();
      }).then((data)=>{
        // set currentUser as data got from response
        if(data.success) that.props.setUser("LOGIN",data.result);
        else{
          switch(data.error){
            // handle error
          }
        }
      });
    }
    onChange(event,newVal){
      if(event.target.type =="email")
        this.setState({email: newVal});
      else
        this.setState({password: newVal});
    }
    render(){
        const login = this.state.login;
        return (
            <div>
              <p>{login?"登入會員":"註冊會員"}</p>
              <TextField
                floatingLabelText="輸入信箱..."
                hintText="輸入信箱..."
                type="email"
                onChange = {this.onChange}
              />
              <p>{this.state.emailMsg}</p>
              <TextField
                hintText="輸入密碼..."
                floatingLabelText="輸入密碼..."
                type="password"
                onChange = {this.onChange}
              />
              <p>{this.state.passwordMsg}</p>
              {!login && <TextField
                hintText="確認..."
                floatingLabelText="請再輸入一次密碼..."
                type="password"
              />}
              <RaisedButton label={login?"登入":"註冊"} primary={true} style={{margin: "0.8rem"}} 
                            onClick={login?this.login:this.signUp}/>
              {login?<p>還未註冊?<span onClick={this.changeAction}>註冊為會員</span></p>:<p>已經有帳號?<span onClick={this.changeAction}>按此登入</span></p>}
            </div>
          );
    }
}

import handleRoom from "../dispatchers/handleRooms";
import currentRoom from "../dispatchers/currentRoom";
import setUser from "../dispatchers/setUser";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


  const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
      setUser: setUser
    },dispatch);
  }

Login = connect(null,mapDispatchToProps)(Login);

export default Login;
