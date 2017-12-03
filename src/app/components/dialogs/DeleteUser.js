import {Component} from 'react';
import BaseDialog from "./BaseDialog";


class DeleteUser extends Component{
    constructor(props){
        super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }
    deleteUser(value,setHint){
        if(value===""){
            setHint("此欄位不可為空白");
            return;
        }      
        const that = this;
        const api = "a/user/delete?_id="+that.props.currentUser._id+"&password="+value;
        debug(api);
        fetch(encodeURI(api),{
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: "JWT "+sessionStorage.getItem("token")
            },
            body: undefined
          }).then((data)=>{
          return data.json();
        }).then((data)=>{
            if(data.success){
                that.props.toggle();
                that.props.changeRoom(null);
                that.props.setUser("LOGOUT");
            }else{
                // handle error
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
                handle = {this.deleteUser}
                label = "請輸入密碼..."
                floatingLabel = "請輸入密碼..."
                title = "您確定要刪除帳號嗎?"
                des1 = "注意:此動作無法回復，且您將無法取回帳號"
                des1Class = "hint"
                open={this.props.open}
            />);
    }
}



import currentRoom from "../../dispatchers/currentRoom";
import setUser from "../../dispatchers/setUser";
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

DeleteUser = connect(mapStateToProps,mapDispatchToProps)(DeleteUser);

module.exports = DeleteUser;