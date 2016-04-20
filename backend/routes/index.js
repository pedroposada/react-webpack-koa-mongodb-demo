import model from '../models'
import * as actions from '../actions'



/**
 * ----------------------------- ROUTES --------------------
 */

const PREFIX = `/api`

export default (router) => {
  router.post(`${PREFIX}/login`, actions.login())

  router.get(`${PREFIX}/todos`, actions.readTodos(model))
  router.post(`${PREFIX}/todos`, actions.addTodo(model))
  router.put(`${PREFIX}/todos`, actions.updateTodo(model))
}