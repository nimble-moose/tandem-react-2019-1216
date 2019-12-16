import React from 'react';
import './App.css';
import Game from './Game'

class App extends React.Component {

  constructor(props) {
    console.log('App constructor')
    super(props)
  }

  componentDidMount() {
    console.log('App componentDidMount')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate', prevProps, prevState)
  }

  render() {
    console.log('App render')
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
