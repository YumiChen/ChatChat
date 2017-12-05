import React from "react";
import {render} from "react-dom";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import config from "../../config";

// set theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

// set debug method
import debug from "../debug";
import detectDevice from "../detectDevice";

const getTheme = (() => {
  let overwrites = {
    "palette": {
        "primary1Color": "#795548",
        "primary2Color": "#8d6e63",
        "accent1Color": "#ffab40",
        "accent2Color": "#ff6d00",
        "accent3Color": "#ffcc80",
        "pickerHeaderColor": "#5d4037"
    }
};
  return getMuiTheme(baseTheme, overwrites);
})();


require("./style.sass");

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            newPassword: "",
            newPasswordHint: ""
        }

        this.setNewPassword = this.setNewPassword.bind(this);
        this.reset = this.reset.bind(this);
    }
    setNewPassword(event,value){
        this.setState({
            newPassword: value
        });
    }
    reset(event){
        event.preventDefault();
        var params = (window.location.href).split("/"),
            token = params[params.length-1];

        var api = "/a/resetPassword", that = this;
        fetch(api,{
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              Authorization: "JWT "+sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                token: token,
                password: that.state.newPassword
            })
        }).then(function(data){
            return data.json();
        }).then(function(data){
            if(data.success){
                // success
                location.href = config.server;
            }else{
                // fail
                this.setState({newPasswordHint: "某處發生了錯誤"});
            }
        });
    }
    componentDidMount(){
        if(mobileAndTabletcheck()){
            document.body.style.height = window.innerHeight +'px';
            document.body.style.backgroundSize = window.innerWidth + " " + window.innerHeight;
            window.onResize = function(){
                alert("resize");
                document.body.style.height = window.innerHeight +'px';
                document.body.style.backgroundSize = window.innerWidth + " " + window.innerHeight;
            }
        }
    }
    render(){
        return (
            <MuiThemeProvider muiTheme={getTheme}>
                <form onSubmit = {this.reset}>
                    <p style={{fontWeight: "bold"}}>請輸入新密碼: </p>
                    <TextField
                    floatingLabelText="請輸入新密碼"
                    onChange={this.setNewPassword}
                    style={{width: "90%"}}
                    />
                    <p>{this.state.newPasswordHint}</p>
                    <RaisedButton
                    type="submit"
                    label="送出"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.reset}
                    />
                </form>
            </MuiThemeProvider>
        );
    }
}
    
render(<App />,document.body);