import React, {useState} from 'react';
import useToggle from './hooks/useToggle'
import './App.css';

function App() {

  const [ openOrClosed, toggleOpen ] = useToggle(["BEEF", "CHICKEN", "VEGETARIAN"])

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleOpen}>
          Toggle Me!
        </button>

        <p>{ openOrClosed }</p>
      </header>
    </div>
  );
}

export default App;
