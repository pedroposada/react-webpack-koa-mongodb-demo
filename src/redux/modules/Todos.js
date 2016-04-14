import { xhttp } from 'xhttp'

/**
 * ------------------- AJAX -------------------------
 */

const url = 'http://localhost:5000/api'
const token = () => (localStorage.getItem('token') || 'TOKEN')

// Promise wrapper for xhttp
const rp = (options: Object): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function, reject: Function): void => {
      xhttp(options, resolve, (response, xhr) => {
        if (xhr.statusText === 'Unauthorized') {
          dispatch(displayError('Unauthorized'))
          // dispatch(logoutUser())
          return
        }
        reject()
      })
    })
  }
}

/**
 * ------------------- ACTIONS -------------------------
 */

// Constants
export const ADD_TODO = 'ADD_TODO'
export const LOAD_TODOS = 'LOAD_TODOS'
export const UPDATE_TODO = 'UPDATE_TODO'
export const CHANGE_FIELD = 'CHANGE_FIELD'
export const DISPLAY_ERROR = 'DISPLAY_ERROR'

// Action Creators
const onAdd = (text) => {
  return (dispatch, getState) => {
    dispatch(rp({
      url: `${url}/todos`,
      method: 'POST',
      body: {
        text: text,
        completed: false,
        weight: 0
      },
      json: true,
      headers: { 'Authorization': `Bearer ${token()}` }
    }))
    .then(({ todo }) => {
      dispatch(addTodo(todo))
    })
    .catch(() => {
      dispatch(displayError('Server error'))
    })
  }
}
const onUpdate = (index, todo) => {
  return (dispatch, getState) => {
    dispatch(rp({
      url: `${url}/todos`,
      method: 'PUT',
      body: todo,
      json: true,
      headers: { 'Authorization': `Bearer ${token()}` }
    }))
    .then(() => {
      dispatch(updateTodo(index, todo))
    })
    .catch(() => {
      dispatch(displayError('Server error'))
    })
  }
}
const onLoad = () => {
  return (dispatch, getState) => {
    dispatch(rp({
      url: `${url}/todos`,
      method: 'GET',
      json: true,
      headers: { 'Authorization': `Bearer ${token()}` }
    }))
    .then(({todos}) => {
      if (Array.isArray(todos)) {
        dispatch(loadTodos(todos))
      } else {
        return Promise.reject()
      }
    })
    .catch(() => {
      dispatch(displayError('Server error'))
    })
  }
}
const addTodo = (todo) => ({ type: ADD_TODO, todo })
const updateTodo = (index, todo) => ({ type: UPDATE_TODO, index, todo })
const loadTodos = (todos: Array) => ({ type: LOAD_TODOS, todos })
const onChangeField = (text) => ({ type: CHANGE_FIELD, text })
const displayError = (text) => ({ type: DISPLAY_ERROR, text })

export const actions = {
  addTodo,
  onAdd,
  onUpdate,
  onLoad,
  updateTodo,
  onChangeField
}

/**
 * Iinitial state of this part of the redux store
 * @type {Object}
 */
export const initialState = {
  todos: [],
  todoFieldValue: '',
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
    case CHANGE_FIELD:
      return Object.assign({}, state, { todoFieldValue: action.text })
    case DISPLAY_ERROR:
      return Object.assign({}, state, { error: action.text })
    case LOAD_TODOS:
      return Object.assign({}, state, { todos: action.todos })
    default:
      return state
  }
}
