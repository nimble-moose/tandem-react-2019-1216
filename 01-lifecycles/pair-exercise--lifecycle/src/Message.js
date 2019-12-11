import React from 'react'

export default ({ message, onUserSelect }) => {

  const selectUser = () => onUserSelect(message.user.id)

  return (
    <div className="message">
      <img onClick={selectUser} src={`avatars/${message.user.avatar}`} alt="avatar" className="avatar"/>
      <p className="from">
        <button className="btn btn-default" onClick={selectUser}>{message.user.name}</button>
      </p>
      <p className="text">{message.text}</p>
    </div>
  )
}
