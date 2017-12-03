import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class BaseDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.default || "",
            hint: ""
        };

        this.toggle = this.toggle.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setHint = this.setHint.bind(this);
        this.handle = this.handle.bind(this);
    }
    setValue(event, value){
        this.setState({value: value});
    }
    setHint(value){
        this.setState({hint: value});
    }
    toggle(){
        this.props.toggle();
        this.setState({ value: this.props.default || "", hint:""});
    }
    handle(){
        this.props.handle(this.state.value, this.setHint);
    }
    render(){
        const props = this.props,
        actions = [
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
            onClick={this.handle}
            />
        ];
    return (
        <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.toggle}
        titleStyle={{padding: "18px 20px 0 20px", fontWeight: "bold"}}
        contentStyle={{maxWidth: "none"}}
        >
        <p className={this.props.des1Class}>{this.props.des1}</p>
        <TextField
        label={this.props.label}
        floatingLabelText={this.props.floatingLabel}
        onChange={this.setValue}
        value={this.state.value}
        style={{width: "90%"}}
        />
        <p className="hint">{this.state.hint}</p>
        <p>{this.props.des2}</p>
        </Dialog>
        );
    }
};

module.exports = BaseDialog;