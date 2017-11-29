// dispatcher: currentUser

import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
          login: true, 
          email:"",
          password:"",
          checkPassword: "",
          name:"",
          emailMsg:"",
          passwordMsg:"",
          nameMsg:"",
          checkPassword:"",
          generalHint: ""
      };

        this.changeAction = this.changeAction.bind(this);
        this.onChange = this.onChange.bind(this);
        this.signUp = this.signUp.bind(this);
        this.login = this.login.bind(this);
        this.check = this.check.bind(this);
    }
    changeAction(){
        this.setState({login: !this.state.login,
          email:"",
          password:"",
          checkPassword: "",
          name:"",
          emailMsg:"",
          passwordMsg:"",
          nameMsg:"",
          checkPassword:"",
          generalHint: ""
        });
    }
    login(){
      if(!this.check()) return;
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
          this.setState({generalHint:"信箱或密碼錯誤"})
        }
      });
    }
    signUp(){
      if(!this.check()) return;
      const that = this, api = "user/insert?_id="+this.state.email+"&password="+this.state.password+"&name="+this.state.name;
      fetch(encodeURI(api)).then((data)=>{
        return data.json();
      }).then((data)=>{
        // set currentUser as data got from response
        if(data.success) that.props.setUser("LOGIN",data.result);
        else{
          switch(data.error){
            // handle error
          }
          this.setState({generalHint:"信箱或密碼錯誤"})
        }
      });
    }
    check(){
      let pass = true;
      
      if(this.state.login){
        if(this.state.email===""){
          this.setState({emailMsg: "您未輸入信箱"});
          pass = false;
        } 
        if(this.state.password===""){
          this.setState({ passwordMsg: "您未輸入密碼"});
          pass = false;
        } 
      }else{
        if(this.state.email===""){
          this.setState({emailMsg: "您未輸入信箱"});
          pass = false;
        } 
        if(this.state.password===""){
          this.setState({ passwordMsg: "您未輸入密碼"});
          pass= false;
        }
        if(this.state.name===""){
          this.setState({nameMsg: "您未輸入暱稱"});
          pass = false;
        }
        if(this.state.checkPassword===""){
          this.setState({ checkPasswordMsg: "您未輸入密碼確認"});
          pass = false;
        }
        if(this.state.password != this.state.checkPassword){
          this.setState({checkPasswordMsg: "您輸入的兩次密碼並不相同"});
          pass = false;
        }
      }
      return pass;
    }
    onChange(event,newVal){
      switch(event.target.name){
        case "email":
          this.setState({email: newVal});
          break;
        case "name":
          this.setState({name: newVal});
          break;
        case "password":
          this.setState({password: newVal});
          break;
        case "checkPassword":
          this.setState({checkPassword: newVal});
          break;
      }
    }
    render(){
        const login = this.state.login;
        return (
            <div className="login">
              <h3 className="loginTitle">{login?"登入會員":"註冊會員"}</h3>
              <TextField
                floatingLabelText="輸入信箱..."
                hintText="輸入信箱..."
                type="email"
                onChange = {this.onChange}
                name="email"
                value={this.state.email}
                floatingLabelStyle={{color: "white"}}
                hintStyle={{color:"white"}}
                inputStyle={{color:"white"}}
              />
              <p className="hint">{this.state.emailMsg}</p>
              {!login && <TextField
                hintText="輸入暱稱( 此欄位可於日後修改)..."
                floatingLabelText="輸入暱稱"
                name="name"
                onChange = {this.onChange}
                value = {this.state.name}
                floatingLabelStyle={{color: "white"}}
                hintStyle={{color:"white"}}
                inputStyle={{color:"white"}}
              />}
              {!login && <p className="hint">{this.state.nameMsg}</p>}
              <TextField
                hintText="輸入密碼..."
                floatingLabelText="輸入密碼..."
                type="password"
                name="password"
                onChange = {this.onChange}
                value={this.state.password}
                floatingLabelStyle={{color: "white"}}
                hintStyle={{color:"white"}}
                inputStyle={{color:"white"}}
              />
              <p className="hint">{this.state.passwordMsg}</p>
              {!login && <TextField
                floatingLabelText="確認密碼..."
                type="password"
                name="checkPassword"
                onChange = {this.onChange}
                value={this.checkPassword}
                floatingLabelStyle={{color: "white"}}
                hintStyle={{color:"white"}}
                inputStyle={{color:"white"}}
              />}
              {!login && <p className="hint">{this.state.checkPasswordMsg}</p>}
              <p className="hint">{this.state.generalHint}</p>
              <RaisedButton label={login?"登入":"註冊"} primary={true} style={{margin: "0.8rem"}} 
                            onClick={login?this.login:this.signUp}/>
              {login?<p className="loginOrSignupHint">還未註冊?<span onClick={this.changeAction}>註冊為會員</span></p>:<p className="loginOrSignupHint">已經有帳號?<span onClick={this.changeAction}>按此登入</span></p>}
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
