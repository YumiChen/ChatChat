import React, {Component} from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from "react-redux";
import store from "./components/store";

require("./assets/stylesheets/test.sass");

const Output = (props)=>(
  <Provider store={store}>
    <div>
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
    </div>
  </Provider>      
);

ReactDOM.render(<Output/>,document.querySelector(".container"));
