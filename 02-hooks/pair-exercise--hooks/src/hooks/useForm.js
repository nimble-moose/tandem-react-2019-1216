import { useState } from 'react'

export default (initialFields) => {

  const fieldValues = initialFields.reduce((acc, def) => {
    return { ...acc, [def.name]: def.value || "" }
  }, {})

  const [ values, setValues ] = useState(fieldValues)

  const setValueByName = (name, val) => {
    const newValues = {...values, [name]: val }
    setValues(newValues)
  }

  const fields = initialFields.map((field, idx) => ({
    ...field,
    onChange: (e) => setValueByName(e.target.name, e.target.value)
  }))

  return { fields, values, setValues }
}
