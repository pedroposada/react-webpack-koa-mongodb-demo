import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import Todos from 'redux/modules/Todos'

export default combineReducers({
  router,
  Todos,
  form: formReducer
})
