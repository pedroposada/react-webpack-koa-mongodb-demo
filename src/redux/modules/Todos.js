import { URL, actions as apiActions } from 'redux/modules/Apis'

/**
 * ------------------- ACTIONS -------------------------
 */

// Constants
export const ADD_TODO = 'ADD_TODO'
export const LOAD_TODOS = 'LOAD_TODOS'
export const UPDATE_TODO = 'UPDATE_TODO'
export const CHANGE_FIELD = 'CHANGE_FIELD'
export const LAST_ERROR = 'LAST_ERROR'

// Action Creators
const onAdd = (text) => {
  return (dispatch, getState) => {
    dispatch(apiActions.callApi({
      url: `${URL}/todos`,
      method: 'POST',
      body: {
        text: text,
        completed: false,
        weight: 0
      }
    }))
    .then((todo) => {
      dispatch(addTodo(todo))
    })
    .catch(() => {
      dispatch(lastError('Server error'))
    })
  }
}
const onUpdate = (index, todo) => {
  return (dispatch, getState) => {
    dispatch(apiActions.callApi({
      url: `${URL}/todos`,
      method: 'PUT',
      body: todo
    }))
    .then(() => {
      dispatch(updateTodo(index, todo))
    })
    .catch(() => {
      dispatch(lastError('Server error'))
    })
  }
}
const onLoad = () => {
  return (dispatch, getState) => {
    dispatch(apiActions.callApi({
      url: `${URL}/todos`,
      method: 'GET'
    }))
    .then((todos) => {
      if (Array.isArray(todos)) {
        dispatch(loadTodos(todos))
      } else {
        return Promise.reject()
      }
    })
    .catch(() => {
      dispatch(lastError('Server error'))
    })
  }
}
const addTodo = (todo) => ({ type: ADD_TODO, todo })
const updateTodo = (index, todo) => ({ type: UPDATE_TODO, index, todo })
const loadTodos = (todos: Array) => ({ type: LOAD_TODOS, todos })
const lastError = (text) => ({ type: LAST_ERROR, text })

export const actions = {
  addTodo,
  onAdd,
  onUpdate,
  onLoad,
  updateTodo
}

/**
 * Iinitial state of this part of the redux store
 * @type {Object}
 */
export const initialState = {
  todos: [],
  error: ''
}

/**
 * Handle actions
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          action.todo
        ]
      })
    case UPDATE_TODO:
      return Object.assign({}, state, {
        todos: [
          ...state.todos.slice(0, action.index),
          action.todo,
          ...state.todos.slice(+action.index + 1)
        ]
      })
    case LAST_ERROR:
      return Object.assign({}, state, { error: action.text })
    case LOAD_TODOS:
      return Object.assign({}, state, { todos: action.todos })
    default:
      return state
  }
}
