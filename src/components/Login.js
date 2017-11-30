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
          id:"",
          emailMsg:"",
          passwordMsg:"",
          idMsg:"",
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
          id:"",
          emailMsg:"",
          passwordMsg:"",
          idMsg:"",
          checkPassword:"",
          checkPasswordMsg:"",
          generalHint: ""
        });
    }
    login(){
      if(!this.check()) return;
      const that = this, api = "user/login";
      fetch(encodeURI(api),
      {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          auth: sessionStorage.getItem("token")
        },
        body: JSON.stringify({
          _id: that.state.id,
          password: that.state.password
        })
      }).then((data)=>{
        return data.json();
      }).then((data)=>{
        // set currentUser as data got from response
        if(data.success) {
          sessionStorage.setItem("token",data.token);
          that.props.setUser("LOGIN",data.result);
        }
        else{
          switch(data.error){
            // handlr error
          }
          this.setState({generalHint:"帳號或密碼錯誤"})
        }
      });
    }
    signUp(){
      if(!this.check()) return;
      const that = this, api = "user/insert";
      fetch(encodeURI(api),{
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          auth: sessionStorage.getItem("token")
        },
        body: JSON.stringify({
          _id: that.state.id,
          userName: that.state.password,
          email: that.state.email,
          password: that.state.password
        })
      }).then((data)=>{
        return data.json();
      }).then((data)=>{
        // set currentUser as data got from response
        if(data.success){
          sessionStorage.setItem("token",data.token);
          that.props.setUser("LOGIN",data.result);
        }
        else{
          switch(data.err){
            // handle error
            case "emailRegistered":
              this.setState({emailMsg: "此信箱已註冊"});
              break;
            case "idUsed":
              this.setState({idMsg: "此帳號已被使用"})
              break;
            default:
              this.setState({generalHint:"信箱或密碼錯誤"})
          }
        }
      });
    }
    check(){
      let pass = true;
      
      if(this.state.login){
        if(this.state.id===""){
          this.setState({idMsg: "您未輸入帳號"});
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
        }else if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)))
        {
          this.setState({emailMsg: "請填入有效信箱"});
          pass = false;
        }
        if(this.state.password===""){
          this.setState({ passwordMsg: "您未輸入密碼"});
          pass= false;
        }
        if(this.state.id===""){
          this.setState({idMsg: "您未輸入帳號"});
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
        case "id":
          this.setState({id: newVal});
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
              floatingLabelText="輸入帳號..."
              hintText={login?"輸入帳號...":"注意，此欄位日後不可修改"}
              name="id"
              onChange = {this.onChange}
              value = {this.state.id}
              floatingLabelStyle={{color: "white"}}
              hintStyle={{color:"white"}}
              inputStyle={{color:"white"}}
            />
            <p className="hint">{this.state.idMsg}</p>
              {!login && <TextField
                floatingLabelText="輸入信箱..."
                hintText="注意，此欄位日後不可修改"
                type="email"
                onChange = {this.onChange}
                name="email"
                value={this.state.email}
                floatingLabelStyle={{color: "white"}}
                hintStyle={{color:"white"}}
                inputStyle={{color:"white"}}
              />}
              {!login && <p className="hint">{this.state.emailMsg}</p>}
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
