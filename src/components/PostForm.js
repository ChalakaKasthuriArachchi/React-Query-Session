import React from 'react'
import {StyledButton} from "./styled";

const defaultFormValues = {
  title: '',
  body: '',
}

export default function PostForm({
  onSubmit,
  initialValues = defaultFormValues,
  submitText,
  clearOnSubmit,
}) {
  const [values, setValues] = React.useState(initialValues)
  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }))

  const handleSubmit = (e) => {
    if (clearOnSubmit) {
      setValues(defaultFormValues)
    }
    e.preventDefault()
    onSubmit(values)
  }

  React.useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title" style={{fontSize: '20px'}}>Title</label>
      <div>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={(e) => setValue('title', e.target.value)}
          required
          style={{width: '300px', fontSize: '25px'}}
        />
      </div>
      <br />
      <label htmlFor="body" style={{fontSize: '20px'}}>Body</label>
      <div>
        <textarea
          type="text"
          name="body"
          value={values.body}
          onChange={(e) => setValue('body', e.target.value)}
          required
          rows="10"
          style={{width: '100%', fontSize: '20px'}}
        />
      </div>
      <br />
      <StyledButton type="submit" style={getButtonStyles(submitText)}>{submitText}</StyledButton>
    </form>
  )
}

function getButtonStyles(text){
    if(text.includes('Saved'))
        return {backgroundColor: 'green', color: 'white'}
    if(text.includes('Saving'))
        return {backgroundColor: 'blue', color: 'white'}
    if(text.includes('Error'))
        return {backgroundColor: 'red', color: 'white'}
    return {}
}
