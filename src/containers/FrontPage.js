import React from 'react'
import { connect } from 'react-redux'
import { actions as todosActions } from 'redux/modules/Todos'
import { actions as accountsActions } from 'redux/modules/Accounts'
import Todolist from 'containers/Todolist'
import LoginForm from 'forms/LoginForm'
import { PageHeader } from 'react-bootstrap'

type Props = {
  Todos: Object,
  Accounts: Object,
  Apis: Object
};
export class FrontPage extends React.Component {
  props: Props;

  render () {
    const { Accounts } = this.props
    return (
      <div>
        <PageHeader>Todos Demo - Client & Server</PageHeader>
        {Accounts.roles.includes('AUTHENTICATED')
          ? <Todolist {...this.props} /> : <LoginForm {...this.props} />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    Todos: state.Todos,
    Accounts: state.Accounts,
    Apis: state.Apis
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: ({ newtodo }) => dispatch(todosActions.onAdd(newtodo)),
    onLoad: () => dispatch(todosActions.onLoad()),
    onUpdate: (index, todo) => () => {
      const todoItem = Object.assign({}, todo, { completed: !todo.completed })
      dispatch(todosActions.onUpdate(index, todoItem))
    },
    onLogin: (account) => dispatch(accountsActions.onLogin(account))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage)
