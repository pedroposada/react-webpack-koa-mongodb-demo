import React, { Component } from 'react'
import Todo from 'components/Todo/Todo'
import TodoForm from 'forms/TodoForm'

type Props = {
  onAdd: Function,
  onLoad: Function,
  onUpdate: Function,
  Todos: Object
};
export class Todolist extends Component {
  props: Props;

  componentDidMount () {
    const { onLoad } = this.props
    onLoad()
  }

  render () {
    const { Todos: { todos }, onAdd, onUpdate } = this.props
    return (
      <div>
        <TodoForm
          {...this.props}
          onAdd={onAdd}
          />
        {[...todos.map((item, index) => {
          return <Todo
            key={index}
            todo={item}
            onChange={onUpdate(index, item)}
            />
        })].reverse()}
      </div>
    )
  }
}

export default Todolist
