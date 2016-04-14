import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Button, Input, Row, Col } from 'react-bootstrap'

const validate = (values) => {
  const errors = {}
  if (!values.newtodo) {
    errors.newtodo = 'This field is required'
  }
  return errors
}

type Props = {
  fields: Object,
  handleSubmit: Function,
  Todos: Object,
  onChangeField: Function,
  resetForm: Function
};
class TodoForm extends Component {
  props: Props;

  render () {
    const {
      fields: { newtodo },
      handleSubmit
    } = this.props

    return (
      <form
        onSubmit={handleSubmit}
        >
        <Row>
          <Col xs={10}>
            <Input
              {...newtodo}
              type='text'
              placeholder='Enter new todo here'
              bsStyle={newtodo.touched && newtodo.error ? 'error' : null}
              help={newtodo.touched ? newtodo.error : ''}
              autoComplete='off'
              />
          </Col>
          <Col xs={2}>
            <Button
              type='submit'
              bsStyle='primary'
              >Add</Button>
          </Col>
        </Row>
      </form>
    )
  }
}

export default reduxForm({
  form: 'TodoForm',
  fields: ['newtodo'],
  validate
})(TodoForm)
