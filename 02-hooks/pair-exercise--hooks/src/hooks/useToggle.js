import { useState} from 'react'

const useToggle = (initialValue) => {
  const [ val, setVal ] = useState(initialValue)
  const toggleVal = () => setVal(!val)

  return [ val, toggleVal]
}

export default useToggle
