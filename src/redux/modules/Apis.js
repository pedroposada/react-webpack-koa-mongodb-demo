import { xhttp } from 'xhttp'
import { actions as accountActions } from 'redux/modules/Accounts'

export const token = () => (localStorage.getItem('token') || 'TOKEN')

/**
 * ------------------- ACTIONS -------------------------
 */

// Constants
export const URL = 'http://localhost:5000/api'
export const LAST_ERROR = 'LAST_ERROR'

// Promise wrapper for xhttp
const callApi = (options: Object): Function => {
  const ops = Object.assign({}, {
    json: true,
    headers: { 'Authorization': `Bearer ${token()}` }
  }, options)
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function, reject: Function): void => {
      xhttp(ops, resolve, (response, xhr) => {
        if (xhr.statusText === 'Unauthorized') {
          dispatch(lastError({msg: 'Unauthorized'}))
          dispatch(accountActions.onLogout())
          return
        }
        reject(response)
      })
    })
  }
}

const lastError = (error) => ({ type: LAST_ERROR, error })

export const actions = {
  callApi,
  lastError
}

/**
 * Iinitial state of this part of the redux store
 * @type {Object}
 */
export const initialState = {
  error: {}
}

/**
 * Handle actions
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case LAST_ERROR:
      return Object.assign({}, state, { error: action.error })
    default:
      return state
  }
}
