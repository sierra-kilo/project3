import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    fetch('/home')
      .then(res => res.json())
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
          Welcome Home
      </div>
    );
  }
}

export default App;
