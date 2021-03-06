import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import Todos from 'redux/modules/Todos'
import Accounts from 'redux/modules/Accounts'
import Apis from 'redux/modules/Apis'

export default combineReducers({
  router,
  Todos,
  Accounts,
  Apis,
  form: formReducer
})
