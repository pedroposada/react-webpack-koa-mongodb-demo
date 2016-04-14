import React from 'react'
import { Input } from 'react-bootstrap'

type Props = {
  todo: Object,
  onChange: Function
};
export class Todo extends React.Component {
  props: Props;

  render () {
    const { todo: { text, completed }, onChange } = this.props
    return (
      <div>
        <Input
          type='checkbox'
          label={completed ? <s>{text}</s> : text}
          checked={completed}
          onChange={onChange}
          />
      </div>
    )
  }
}

export default Todo

