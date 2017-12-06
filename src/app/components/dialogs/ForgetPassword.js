import {Component} from 'react';
import BaseDialog from "./BaseDialog";


class ForgetPassword extends Component{
    constructor(props){
        super(props);
        this.forgetPassword = this.forgetPassword.bind(this);
    }
    forgetPassword(value,setHint){
        if(value===""){
            setHint("此欄位不可為空白");
            return;
        }
    
        const that = this;
        const api = "sendForgetPasswordEmail";
        debug(api);

        that.props.toggleLoading(true);
        fetch(encodeURI(api),{
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: 
            JSON.stringify(
                {
                    email: value
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
                if(data.err == "wrongEmail"){
                    setHint("信箱錯誤");
                }else setHint("某處發生錯誤,請稍後再嘗試");
            }
        });
    }
    render(){
        return (
            <BaseDialog
                toggle = {this.props.toggle}        
                handle = {this.forgetPassword}
                label = "請輸入信箱..."
                floatingLabel = "請輸入信箱..."
                title = "忘記帳號/密碼"
                open={this.props.open}
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

ForgetPassword = connect(mapStateToProps,mapDispatchToProps)(ForgetPassword);

module.exports = ForgetPassword;