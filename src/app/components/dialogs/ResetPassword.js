import {Component} from 'react';
import BaseDialog from "./BaseDialog";


class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.resetPassword = this.resetPassword.bind(this);
    }
    resetPassword(value,setHint){
        if(value===""){
            setHint("此欄位不可為空白");
            return;
        }
    
        const that = this;
        const api = "sendResetPasswordMail";
        debug(api);

        this.props.toggleLoading(true);
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
                    password: value
                })
          }).then((data)=>{
          return data.json();
        }).then((data)=>{
            that.props.toggleLoading(false);
            if(data.success){
                setHint("密碼重設信件已寄至您的信箱");
            }else{
                // handle error
                debug(data.err);
                if(data.err == "wrongPassword"){
                    setHint("密碼錯誤");
                }else setHint("某處發生錯誤,請稍後再嘗試");
            }
        });
    }
    render(){
        return (
            <BaseDialog
                toggle = {this.props.toggle}        
                handle = {this.resetPassword}
                label = "請輸入密碼..."
                floatingLabel = "請輸入密碼..."
                title = "重設密碼"
                open={this.props.open}
                type="password"
            />);
    }
}

import currentRoom from "../../dispatchers/currentRoom";
import setUser from "../../dispatchers/setUser";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import toggleLoading from "../../dispatchers/toggleLoading";

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

ResetPassword = connect(mapStateToProps,mapDispatchToProps)(ResetPassword);

module.exports = ResetPassword;