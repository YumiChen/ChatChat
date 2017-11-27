import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={login: true};
        this.changeUI = this.changeUI.bind(this);
    }
    changeUI(){
        this.setState({login: !this.state.login});
    }
    render(){
        return (
            <div>
              <TextField
                defaultValue="Default Value"
                floatingLabelText="Floating Label Text"
              /><br />
              {this.state.login?null:<TextField
                hintText="Password Field"
                floatingLabelText="Password"
              /><br/>}
              <TextField
                hintText="Password Field"
                floatingLabelText="Password"
                type="password"
              /><br />
              <RaisedButton label="Sign in" primary={true} style={{margin:.8rem}} />
              {this.state.login?<p>還未註冊?<span>註冊為會員</span></p>:<p>已經有帳號?<span>按此登入</span></p>}
            </div>
          );
    }
}

export default Login;
