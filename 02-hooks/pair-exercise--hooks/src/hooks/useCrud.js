import { useState, useEffect } from 'react'

export default ({ resourceUrl, afterFetch}) => {

  useEffect(() => {
    (async () => {
      console.log('useEffect')
      const response = await fetch(resourceUrl)
      const resource = await response.json()
      afterFetch(resource)
    })()
  }, [resourceUrl, afterFetch])

  const updateResource = async (obj) => {
    const response = await fetch(resourceUrl, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
    const resource = await response.json()
    afterFetch(resource)
  }

  return updateResource
}
