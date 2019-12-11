import React from 'react'

export default (props) => {
  if (!props.channels || !props.channels.length)
    return null

  return (
    <ul className="list-group" id="channel_list">
    {props.channels.map(channel => {
      const activeClass = channel.id === props.selectedChannelId ? 'active' : ''
      return (
        <li className={`list-group-item ${activeClass}`}
            key={channel.id}
            onClick={() => props.onSelect(channel.id)}
        >{channel.name}
        </li>
      )
    })}
    </ul>
  )
}
