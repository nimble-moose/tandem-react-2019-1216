import React, { useState } from 'react'
import { TextInput, TextOutput, EditingToggle } from './FormElements'


// In reality, these would probably be passed in as props, but
// keeping them here makes the exercise easier to reason about
const RESOURCE_URL="http://localhost:3001/users/1"
const FIELDS=[
  { label: "First Name", name: "firstName", value: '' },
  { label: "Last Name", name: "lastName", value: '' },
  { label: "Email", name: "email", value: '' },
]

class FormClass extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      inFlight: false,
      currentFieldValues: this.deriveFormValues(FIELDS),
      previousFieldValues: this.deriveFormValues(FIELDS),
    }

    this.toggleEditing = this.toggleEditing.bind(this)
    this.revertForm = this.revertForm.bind(this)
    this.saveForm = this.saveForm.bind(this)
  }

  async componentDidMount() {
    await this.fetchForm()
  }

  componentDidUpdate(prevProps, prevState) {
    // just transitioned from not editing to editing
    if (!prevState.editing && this.state.editing) {
      this.snapshotForm()
    }
  }

  toggleEditing() {
    const editing = !this.state.editing
    this.setState({ editing })
  }

  setFieldValue(name, value) {
    const currentFieldValues = {
      ...this.state.currentFieldValues,
      [name]: value
    }
    this.setState({ currentFieldValues })
  }

  setFieldValues(vals) {
    this.setState({ currentFieldValues: vals })
  }

  revertForm() {
    this.setFieldValues(this.state.previousFieldValues)
  }

  snapshotForm() {
    this.setState({previousFieldValues: this.state.currentFieldValues})
  }

  async saveForm() {
    this.setState({ inFlight: true })
    const response = await fetch(RESOURCE_URL, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.currentFieldValues)
    })
    const resource = await response.json()
    this.setState({ inFlight: false })
    this.setFieldValues(resource)
  }

  async fetchForm() {
    this.setState({ inFlight: true })
    const response = await fetch(RESOURCE_URL)
    const resource = await response.json()
    this.setState({ inFlight: false })
    this.setFieldValues(resource)
  }

  /**
   * creates object of key/value pairs,
   * keyed by 'name' property of array element
   */
  deriveFormValues(fieldArray) {
    return fieldArray.reduce((acc, def) => {
      return { ...acc, [def.name]: def.value || "" }
    }, {})
  }

  render() {

    const { editing, currentFieldValues } = this.state

    return (
      <form style={{ margin: "1em"}}>
        <p className="text-right">
          <EditingToggle tabIndex="1"
           editing={editing}
           toggle={this.toggleEditing}
           persist={this.saveForm}
           revert={this.revertForm} />
        </p>

        { FIELDS.map((fieldDef, idx) => {
          return (
            editing
            ? <TextInput
               key={idx}
               editable={editing}
               label={fieldDef.label}
               name={fieldDef.name}
               value={currentFieldValues[fieldDef.name]}
               onChange={(e) => this.setFieldValue(e.target.name, e.target.value)}
              />
            : <TextOutput
               key={idx}
               label={fieldDef.label}
               value={currentFieldValues[fieldDef.name]}
              />
          )}
        )}

        {this.state.inFlight &&
          <p className="text-center alert alert-info">Request In Flight</p>
        }
      </form>
    )
  }
}

export default FormClass
