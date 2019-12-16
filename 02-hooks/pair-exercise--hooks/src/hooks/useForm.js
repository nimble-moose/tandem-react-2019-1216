import { useState } from 'react'

export default (initialFields) => {
  const [ values, setValues ] = useState(initialFields.map(field => field.value))

  const setValueByIndex = (idx, val) => {
    const newValues = [...values]
    newValues[idx] = val
    setValues(newValues)
  }

  const fields = initialFields.map((field, idx) => ({
    ...field,
    onChange: (e) => setValueByIndex(idx, e.target.value)
  }))

  return { fields, values }
}
