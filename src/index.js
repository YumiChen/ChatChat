import React, {Component} from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from "react-redux";
import store from "./store";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

const getTheme = (() => {
  let overwrites = {
    "palette": {
        "primary1Color": "#6d4c41",
        "primary2Color": "#8d6e63",
        "accent1Color": "#ffab40",
        "accent2Color": "#ff6d00",
        "accent3Color": "#ffcc80",
        "pickerHeaderColor": "#5d4037"
    }
};
  return getMuiTheme(baseTheme, overwrites);
})();

require("./assets/stylesheets/test.sass");

const Output = (props)=>(
  <Provider store={store}>
    <div>
    <MuiThemeProvider muiTheme={getTheme}>
      <App/>
    </MuiThemeProvider>
    </div>
  </Provider>      
);

ReactDOM.render(<Output/>,document.querySelector(".container"));
