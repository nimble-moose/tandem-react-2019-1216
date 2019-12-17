import { useState, useEffect, useRef } from 'react'

export default ({ condition, values }) => {
  const [ snapshot, setValues ] = useState(values)

  const conditionWasTrue = useRef(condition)

  useEffect(() => {
    if (!conditionWasTrue.current && condition) {
      setValues(values)
    }
    conditionWasTrue.current = condition
  }, [condition, values])

  return [ snapshot ]
}
