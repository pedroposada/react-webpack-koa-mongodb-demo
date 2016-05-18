import { xhttp } from 'xhttp'

// Constants
// export const constants = { }

// Action Creators
const sendSearch = (query) => {
  return (dispatch, getState) => {
    dispatch(onChange({
      submitting: true,
      submitted: false
    }))
    xhttp({
      url: 'http://netflixroulette.net/api/api.php',
      method: 'GET',
      body: query,
      headers: {
        'Content-Type': 'text/plain',
        'Accept': 'text/plain'
      }
    },
    (response) => {
      if (!Array.isArray(response)) {
        response = [response]
      }
      dispatch(onChange({
        submitted: true,
        submitting: false,
        message: '',
        response: response
      }))
    },
    (response) => {
      dispatch(onChange({
        submitted: true,
        submitting: false,
        message: response.message,
        response: []
      }))
    })
  }
}

const onChange = (data) => ({ type: 'ONCHANGE', data })

export const actions = {
  onChange,
  sendSearch
}

// Reducer
export const initialState = {
  submitted: false,
  submitting: false,
  message: '',
  response: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'ONCHANGE':
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}
