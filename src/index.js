import React, {Component} from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

require("./assets/stylesheets/test.sass");

const Output = (props)=>(
  <div>
  <MuiThemeProvider>
    <App/>
  </MuiThemeProvider>
  </div>
);

ReactDOM.render(<Output/>,document.querySelector(".container"));
