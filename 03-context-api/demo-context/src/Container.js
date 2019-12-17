import React, { useContext, useState } from 'react';
import LoginForm from './LoginForm'
import ProfilePage from './ProfilePage'
import UserContext from './UserContext'

export default ({ username, setUsername, logout}) => {

  return (
    <UserContext.Provider value={username}>
      <div className="App container">
        <LoginForm onSubmit={setUsername} onLogout={logout} />
        <ProfilePage />
      </div>
    </UserContext.Provider>
  );
}
