import React, { Component } from 'react';
import './AppHeader.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  type(e) {
    this.setState({
      name: e.target.value
    });
  }
  handleEnterAdd(e) {
    if (e.key === "Enter") {
      console.log(e);
    }
  }
  render() {
    const { name } = this.state;
    return (
      <div>
        <div>
          GOOD READS APP
        </div>
        <div>
          <input type="text" value={name} onKeyPress={e => this.handleEnterAdd(e) } onChange={e => this.type(e)} />
          <button>Search</button>
        </div>
      </div>
    );
  }
}

export default App;
