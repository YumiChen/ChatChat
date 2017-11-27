import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class AddRoom extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const actions = [
            <FlatButton
            label="取消"
            primary={true}
            keyboardFocused={true}
            onClick={this.props.toggleAddRoom}
            />,
            <FlatButton
            label="創建"
            primary={true}
            keyboardFocused={true}
            onClick={this.props.toggleAddRoom}
            />
        ];
    return (
        <Dialog
        title="Create new chatroom"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.toggleAddRoom}
      >
        <TextField
        hintText="輸入您喜歡的名稱..."
        floatingLabelText="Room name"
        /><br />
        <TextField
        hintText="輸入進入房間的通關密碼..."
        floatingLabelText="Password"
        /><br />
      </Dialog>);
    }
};

module.exports = AddRoom;