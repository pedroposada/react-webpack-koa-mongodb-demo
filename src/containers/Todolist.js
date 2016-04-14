import React, { Component } from 'react'
import { connect } from 'react-redux'
import TodoForm from 'forms/TodoForm'
import { actions as todosActions } from 'redux/modules/Todos'
import Todo from 'components/Todo/Todo'

type Props = {
  onAdd: Function,
  onLoad: Function,
  onChangeField: Function,
  Todos: Object,
  onUpdate: Function
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
          onSubmit={onAdd}
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

const mapStateToProps = (state) => {
  return {
    TodoForm: state.form,
    Todos: state.Todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: ({ newtodo }) => dispatch(todosActions.onAdd(newtodo)),
    onLoad: () => dispatch(todosActions.onLoad()),
    onChangeField: (text) => dispatch(todosActions.onChangeField(text)),
    onUpdate: (index, todo) => () => {
      const todoItem = Object.assign({}, todo, { completed: !todo.completed })
      dispatch(todosActions.onUpdate(index, todoItem))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todolist)
