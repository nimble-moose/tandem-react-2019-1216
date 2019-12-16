import React, { useState } from 'react'
import useToggle from './hooks/useToggle'
import { ToggleText, EditingToggle } from './FormElements'


// In reality, these would probably be passed in as props, but
// keeping them here makes the exercise easier to reason about
const RESOURCE_URL="http://localhost:3001/users/1"
const FIELDS=[
  { label: "First Name", name: "firstName", value: 'Ben' },
  { label: "Last Name", name: "lastName", value: 'Wilhelm' },
  { label: "Email", name: "email", value: 'benjamin.m.wilhelm@gmail.com' },
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

          fieldDef.onChange = (e) => this.setFieldValue(e.target.name, e.target.value)

          return (
           <ToggleText
            key={idx}
            editable={editing}
            fieldDefinition={fieldDef}
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


const FormFunction = (props) => {
  const [ editing, toggleEditing ] = useToggle(false)
  const [ currentFieldValues, setFieldValues ] = useState(FIELDS.map(field => field.value))

  // const { fields, values } = useForm(FIELDS)

  const [ inFlight, setInFlight] = useState(false)

  return (
    <form style={{ margin: "1em"}}>
      <p className="text-right">
        <EditingToggle tabIndex="1"
         editing={editing}
         toggle={toggleEditing}
         persist={() => {}}
         revert={() => {}} />
      </p>

      { FIELDS.map((fieldDef, idx) => {

        // fieldDef.onChange = (e) => this.setFieldValue(e.target.name, e.target.value)
        // fieldDef.onChange = () => {}

        return (
         <ToggleText
          key={idx}
          editable={editing}
          fieldDefinition={fieldDef}
          value={currentFieldValues[idx]}
         />
        )}
      )}

      {inFlight &&
        <p className="text-center alert alert-info">Request In Flight</p>
      }
    </form>
  )
}

export default FormFunction
