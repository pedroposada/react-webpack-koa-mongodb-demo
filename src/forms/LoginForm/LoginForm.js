import React from 'react'
import { reduxForm } from 'redux-form'
import { Input, Button } from 'react-bootstrap'

export const fields = ['username', 'password']

const validate = (values) => {
  const errors = {}

  if (!values.username) {
    errors.username = 'Username is required'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }

  return errors
}

type Props = {
  handleSubmit: Function,
  fields: Object,
  onLogin: Function,
  Apis: Object
}
export class Login extends React.Component {
  props: Props;

  defaultProps = {
    fields: {}
  }

  render () {
    const {
      fields: { username, password },
      handleSubmit,
      onLogin,
      Apis
    } = this.props

    return (
      <form onSubmit={handleSubmit((data) => {
        onLogin(data)
      })}>
        <Input
          type='text'
          placeholder='Username'
          autoComplete='off'
          help={username.touched && (username.error || Apis.error.message)
            ? username.error || Apis.error.message : ''}
          bsStyle={username.touched && (username.error || Apis.error.message)
            ? 'error' : null}
          {...username}
          />
        <Input
          type='password'
          placeholder='Password'
          autoComplete='off'
          help={password.touched && (password.error || Apis.error.message)
            ? password.error || Apis.error.message : ''}
          bsStyle={password.touched && (password.error || Apis.error.message)
            ? 'error' : null}
          {...password}
          />
        <Button
          type='submit'
          bsStyle='primary'
          >Login</Button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'LoginForm',
  fields,
  validate
})(Login)
