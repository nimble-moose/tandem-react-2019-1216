import React, { useState } from 'react';
import Container from './Container'
import './App.css';


function App() {
  const [ username, setUsername ] = useState(null)
  const logout = () => setUsername(null)

  return <Container username={username} setUsername={setUsername} logout={logout} />
}

export default App
