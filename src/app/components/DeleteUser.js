import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

class DeleteUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            deleteUser: "",
            deleteUserHint: ""
        };

        this.toggle = this.toggle.bind(this);
        this.setDeleteUser = this.setDeleteUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }
    deleteUser(){
        if(this.state.deleteUser===""){
            this.setState({deleteUserHint: "此欄位不可為空白"});
            return;
        }      
        const that = this;
        const api = "a/user/delete?_id="+that.props.currentUser._id+"&password="+this.state.deleteUser;
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
                that.toggle();
                that.props.changeRoom(null);
                that.props.setUser("LOGOUT");
            }else{
                // handle error
                if(data.err == "wrongPassword"){
                    this.setState({roomNameHint: "密碼錯誤"});
                }else this.setState({roomNameHint: "某處發生錯誤,請稍後再嘗試"});
            }
        });
    }
    setDeleteUser(event, value){
        this.setState({deleteUser: value});
    }
    toggle(){
        this.props.toggle();
        this.setState({ deleteUser: "", deleteUserHint:""});
    }
    render(){
        const props = this.props,
        deleteUserActions = [
            <FlatButton
            label="取消"
            primary={true}
            keyboardFocused={true}
            onClick={this.toggle}
            />,
            <FlatButton
            label="確認"
            primary={true}
            keyboardFocused={true}
            onClick={this.deleteUser}
            />
        ];
    return (
        <Dialog
        title="您確定要刪除帳號嗎?"
        actions={deleteUserActions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.toggle}
        titleStyle={{padding: "18px 20px 0 20px", fontWeight: "bold"}}
        contentStyle={{maxWidth: "none"}}
        >
        <p className="hint">注意:此動作無法回復，且您將無法取回帳號</p>
        <TextField
        floatingLabelText="請輸入密碼..."
        onChange={this.setDeleteUser}
        value={this.state.deleteUser}
        style={{width: "90%"}}
        />
        <p className="hint">{this.state.deleteUserHint}</p>
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

DeleteUser = connect(mapStateToProps,mapDispatchToProps)(DeleteUser);

module.exports = DeleteUser;