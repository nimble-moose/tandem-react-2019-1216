import { useState } from 'react'

const useToggle = (vals) => {

  const [ idx, setIdx ] = useState(0)

  const advance = () => {
    const newIdx = (idx+1) % vals.length
    setIdx( newIdx )
  }

  return [ vals[idx], advance ]
}

export default useToggle
