import React, {useState} from 'react';
import './App.css';

function App() {

  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setIsOpen(!isOpen)}>
          Toggle Me!
        </button>

        <p>{ isOpen ? "OPEN" : "CLOSED" }</p>
      </header>
    </div>
  );
}

export default App;
