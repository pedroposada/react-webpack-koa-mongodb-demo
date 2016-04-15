import jwt from 'jsonwebtoken'
import { URL, actions as apiActions } from 'redux/modules/Apis'

// Constants
const LOGIN = 'LOGIN'
const RESET = 'RESET'

// Action Creators
const onLogin = ({ username, password }) => {
  return (dispatch, getState) => {
    dispatch(apiActions.callApi({
      url: `${URL}/login`,
      method: 'POST',
      body: {
        username,
        password
      }
    }))
    .then(({ token }) => {
      localStorage.setItem('token', token)
      const { username, roles } = jwt.decode(token)
      dispatch(saveAccount({
        username,
        roles
      }))
    })
    .catch((response) => {
      dispatch(apiActions.lastError(response))
    })
  }
}
const onLogout = () => {
  return (dispatch, getState) => {
    localStorage.removeItem('token')
    dispatch(reset())
  }
}
const saveAccount = (account) => ({ type: LOGIN, account })
const reset = () => ({ type: RESET })

export const actions = {
  onLogin,
  onLogout
}

// Reducer
const resetted = {
  username: '',
  roles: []
}
export const initialState = Object.assign({}, resetted, jwt.decode(localStorage.getItem('token')))

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, action.account)
    case RESET:
      return resetted
    default:
      return state
  }
}
