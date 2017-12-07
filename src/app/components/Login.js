// dispatcher: currentUser

import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ForgetPassword from "./dialogs/ForgetPassword";

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
          generalHint: "",
          showForgetPassword: false,
          showConfirmationHint: false,
          confirmationHint: ""
      };

        this.changeAction = this.changeAction.bind(this);
        this.onChange = this.onChange.bind(this);
        this.signUp = this.signUp.bind(this);
        this.login = this.login.bind(this);
        this.check = this.check.bind(this);
        this.toggleForgetPassword = this.toggleForgetPassword.bind(this);
        this.resendConfirmationMail = this.resendConfirmationMail.bind(this);
        this.clear = this.clear.bind(this);
    }
    toggleForgetPassword(){
      this.setState({showForgetPassword: !this.state.showForgetPassword});
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
    clear(){
      this.setState({
        emailMsg:"",
        passwordMsg:"",
        idMsg:"",
        checkPasswordMsg:"",
        generalHint: "",
        showConfirmationHint: false
      });
      sessionStorage.setItem("token",null);
    }
    login(){
      if(!this.check()) return;
      const that = this, api = "user/login";
      this.clear();

      this.props.toggleLoading(true);      
      fetch(encodeURI(api),
      {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem("token")
        },
        body: JSON.stringify({
          _id: that.state.id,
          password: that.state.password
        })
      }).then((data)=>{
        return data.json();
      }).then((data)=>{
        that.props.toggleLoading(false);
        
        // set currentUser as data got from response
        if(data.success) {
          sessionStorage.setItem("token",data.token);
          this.setState({showConfirmationHint: false});
          that.props.setUser("LOGIN",data.result);
        }
        else{
          switch(data.err){
            case "notConfirmed":
              this.setState({
                showConfirmationHint: true,
                confirmationHint: "您的帳號尚未驗證"
              });
              sessionStorage.setItem("token",data.token);
              break;
            default:
              this.setState({generalHint:"帳號或密碼錯誤"})
              break;
          }
        }
      });
    }
    signUp(){
      if(!this.check()) return;
      const that = this, api = "user/insert";
      this.clear();

      this.props.toggleLoading(true);      
      fetch(encodeURI(api),{
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: "JWT "+sessionStorage.getItem("token")
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
        that.props.toggleLoading(false);
        // set currentUser as data got from response
        if(data.success){
          this.setState({
            showConfirmationHint: true,
            confirmationHint: "信箱驗證信已寄至您的信箱"
          });
          sessionStorage.setItem("token",data.token);
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
              this.setState({generalHint:"某處發生錯誤,請稍後再嘗試"})
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
    resendConfirmationMail(){
      const that = this, api = "resendConfirmationMail/" + sessionStorage.getItem("token");
      this.props.toggleLoading(true);

      fetch(encodeURI(api),{
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: "JWT "+sessionStorage.getItem("token")
        },
        body: undefined
      }).then((data)=>{
        console.log(data);
        if(data.statusText=="Unauthorized") return {success: false};
        return data.json();
      }).then((data)=>{
        that.props.toggleLoading(false);
        // set currentUser as data got from response
        if(data.success){
          this.setState({
            confirmationHint: "信箱驗證信已寄至您的信箱"
          });
        }
        else{
          switch(data.err){
            default:
              this.setState({confirmationHint:"某處發生錯誤,請稍後再嘗試"})
          }
        }
    });
    }
    render(){
        const login = this.state.login;
        return (
            <form className="login" onSubmit={ login?(e)=>{ e.preventDefault(); this.login();}:(e)=>{ e.preventDefault(); this.signUp();} } >
              {this.state.showConfirmationHint && <div className="confirmationHint"><p>{this.state.confirmationHint}</p><p onClick={this.resendConfirmationMail}>重寄驗證信?</p></div>}
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
            <p className="hint loginHint">{this.state.idMsg}</p>
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
              {!login && <p className="hint loginHint">{this.state.emailMsg}</p>}
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
              <p className="hint loginHint">{this.state.passwordMsg}</p>
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
              {!login && <p className="hint loginHint">{this.state.checkPasswordMsg}</p>}
              <p className="hint loginHint">{this.state.generalHint}</p>
              <RaisedButton type="submit" label={login?"登入":"註冊"} primary={true} style={{margin: "13px"}} />
              {login?<p className="loginOrSignupHint">還未註冊? <span onClick={this.changeAction}>註冊為會員</span></p>:<p className="loginOrSignupHint">已經有帳號? <span onClick={this.changeAction}>按此登入</span></p>}
              {login && <p  className="forgetPassword"
                            style= {{cursor:"pointer"}}
                            onClick={this.toggleForgetPassword} >忘記帳號或密碼?</p> }
              {login && <ForgetPassword toggle={this.toggleForgetPassword}
                                      open={this.state.showForgetPassword}
                                      />}
            </form>
          );
    }
}

import handleRoom from "../dispatchers/handleRooms";
import currentRoom from "../dispatchers/currentRoom";
import setUser from "../dispatchers/setUser";
import toggleLoading from "../dispatchers/toggleLoading";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


  const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
      setUser: setUser,
      toggleLoading: toggleLoading
    },dispatch);
  }

Login = connect(null,mapDispatchToProps)(Login);

export default Login;
