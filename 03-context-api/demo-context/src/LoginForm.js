import React from 'react'
import { useContext } from 'react'
import UserContext from './UserContext'

const LoginForm = ({ onSubmit }) => (
  <form className="auth-header form-inline" onSubmit={e => {
    e.preventDefault()
    const name = e.target.querySelector("#yourName").value || null
    onSubmit(name)
  }}>
    <input type="text" className="form-control" name="yourName" id="yourName" placeholder="Your Name"/>
    <input type="submit" className="btn btn-primary" value="Log In" />
  </form>
)

const LogoutButton = ({ onLogout }) => (
  <div className="auth-header">
    <button className="btn btn-primary" onClick={onLogout}>Log Out</button>
  </div>
)

export default ({ onSubmit, onLogout}) => {
  const username = useContext(UserContext)

  return !!username
  ? <LogoutButton onLogout={onLogout} />
  : <LoginForm onSubmit={onSubmit}/>
}
