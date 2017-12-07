import {Component} from 'react';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class DisplaySettings extends Component {
  constructor(props){
    super(props);
    this.state = {
        fontSize: 1,
        bold: false
      };
      this.handlefontSize = this.handlefontSize.bind(this);
      this.toggleBold = this.toggleBold.bind(this);
      this.setDisplay = this.setDisplay.bind(this);
  }
  handlefontSize(event, value){
    this.setState({fontSize: value});
  }
  toggleBold(e, checked){
    this.setState({bold: checked});

  }
  setDisplay(){
    const el = document.querySelector("html");
    // set fontSize
    el.style.fontSize = this.state.fontSize + "em";
    // set font weight
    if(this.state.bold) el.style.fontWeight = "bold";
    else el.style.fontWeight = "normal";

    this.props.toggle();
  }
  render() {
    const actions = [
      <FlatButton
      label="確定"
      primary={true}
      keyboardFocused={true}
      onClick={this.setDisplay}
      />,
        <FlatButton
        label="關閉"
        primary={true}
        keyboardFocused={true}
        onClick={this.props.toggle}
        />];
    return (
      <Dialog
      title="顯示設定"
      actions={actions}
      modal={false}
      open={this.props.open}
      onRequestClose={this.props.toggle}
      titleStyle={{padding: "18px 20px 0 20px", fontWeight: "bold"}}
      autoDetectWindowHeight={false}
      >
      <p>
        <span>字體大小: </span>
        <span>{this.state.fontSize+" em"}</span>
      </p>
        <Slider
          min={1}
          max={2.2}
          step={0.1}
          value={this.state.fontSize}
          onChange={this.handlefontSize}
        />
        <Toggle
            label="顯示粗體"
            labelStyle={{fontFamily: "微軟正黑體",color: "rgba(0, 0, 0, 0.6)"}}
            onToggle = {this.toggleBold}
            toggled = {this.state.bold}
        />
      </Dialog>
    );
  }
}