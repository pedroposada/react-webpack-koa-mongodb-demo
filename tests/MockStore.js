import { createStore, applyMiddleware } from 'redux'
import { spy } from 'sinon'
import { reducer as formReducer } from 'redux-form'


const MockStore = createStore(
  (state = {}, action) => {
    return state
  },
  {
    Accounts: {
    	username: '',
    	roles: []
    },
    form: formReducer
  },
  applyMiddleware((getState, dispatch) => {
    // Null middleware to avoid calling true actions
    return (next) => (action) => { /* ... */ }
  })
)

// Spy the dispatch function
MockStore.dispatchSpy = spy(MockStore, 'dispatch')

export default MockStore