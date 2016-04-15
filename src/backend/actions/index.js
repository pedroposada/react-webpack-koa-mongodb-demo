import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_TTL } from '../index'

/**
 * ------------------------ ACTIONS -----------
 */

/**
 * Validate credentials and return JWT on success
 * @return {Function} next  [generator function]
 */
export const login = () => {
  return async (ctx, next) => {
    await next()
    let result

    const { username, password } = ctx.request.body

    // @todo: use real accounts
    let account = false
    if (username === 'test' && password === 'test') {
      account = {
        roles: ['AUTHENTICATED'],
        username: 'testusername'
      }
    }
    if (account === false) {
      ctx.throw('Invalid credentials.', 400)
    }

    result = jwt.sign(account, JWT_SECRET, { expiresIn: JWT_TTL }) // time in seconds
    return ctx.body = { token: result }
  }
}

/**
 * Add new todo
 * @return {Function} next  [generator function]
 */
export const addTodo = (model) => {
  return async (ctx, next) => {
    await next()
    let result
    const body = ctx.request.body
    result = await model.create({
      text: body.text,
      completed: false,
      weight: Number(body.weight)
    })
    return ctx.body = result
  }
}

/**
 * Update todo
 * @return {Function} next  [generator function]
 */
export const updateTodo = (model) => {
  return async (ctx, next) => {
    await next()
    let result
    const body = ctx.request.body
    result = await model.findOneAndUpdate({ _id: body._id }, body, {}).lean().exec()
    return ctx.body = result
  }
}

/**
 * Read todos
 * @return {Function} next  [generator function]
 */
export const readTodos = (model) => {
  return async (ctx, next) => {
    await next()
    let result, todos
    result = await model.find().lean().exec()
    return ctx.body = result
  }
}