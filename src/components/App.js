import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import Log from "./Log";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showNav: false
  };
  this.toggleNav = this.toggleNav.bind(this);
  }
  toggleNav(event){
    this.setState({showNav:!this.state.showNav});
  }
  render(){
    return (
      <div>
        <Nav toggleNav={this.toggleNav}/>
        <div className="mainContainer">
          <Sidebar open={this.state.showNav} toggleNav={this.toggleNav}/>
          <Log/>
        </div>
    </div>
    );
  }
}

export default App;
