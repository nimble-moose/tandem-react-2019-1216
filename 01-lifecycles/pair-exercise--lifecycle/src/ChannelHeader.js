import React from 'react'

export default ({ channel }) => {
    if (!channel)
      return null

    return <h1 id="channel_heading">#{channel.name}</h1>
}
