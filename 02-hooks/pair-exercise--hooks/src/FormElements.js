import React from 'react'

export const TextInput = ({ label, name, value, onChange }) => (
  <div className="form-group row">
    <label className="col-4 col-form-label text-right" htmlFor="{name}">{label}</label>
    <input className='col-8 form-control' type="text" name={name} value={value} onChange={onChange} />
  </div>
)

export const TextOutput = ({ label, value }) => (
  <div className="row">
    <div className="col-4 text-right">
      <p>{label}</p>
    </div>
    <div className="col-8">
      <p>{value}</p>
    </div>
  </div>
)

export const ToggleText = ({ Input=TextInput, Output=TextOutput, editable, fieldDefinition, value}) => {
  return editable
  ? <TextInput label={fieldDefinition.label} name={fieldDefinition.name} value={value} onChange={fieldDefinition.onChange} />
  : <TextOutput label={fieldDefinition.label} value={value} />
}


const EditButton = ({ onClick }) => (
  <button className="btn btn-primary" onClick={(e) => {e.preventDefault(); onClick()}} >
    Edit
  </button>
)

const SaveOrCancel = ({ save, cancel }) => (
  <>
    <button className="btn btn-default" onClick={(e) => {e.preventDefault(); cancel()}}>Cancel</button>
    <button className="btn btn-primary" onClick={(e) => {e.preventDefault(); save()}}>Save</button>
  </>
)

export const EditingToggle = ({ editing, toggle, persist, revert }) => {
  const revertAndToggle = () => {
    revert()
    toggle()
  }

  const saveAndToggle = () => {
    persist()
    toggle()
  }

  return editing
    ? <SaveOrCancel save={saveAndToggle} cancel={revertAndToggle} />
    : <EditButton onClick={toggle} />
}
