import jwt from 'jsonwebtoken'

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
    const username = ctx.request.body.username
    const password = ctx.request.body.password

    // @todo: use real accounts
    let account = false
    if (username === 'testusername' && password === 'testpassword') {
      account = {
        roles: ['AUTHENTICATED'],
        username: 'testusername',
        password: 'testpassword',
      }
    }
    if (account === false) {
      ctx.throw('Invalid credentials.', 400)
    }

    result = jwt.sign(account, 'topsecret', { expiresIn: 60*60*5 }) // time in seconds
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
    try {
      result = await model.create({
        text: body.text,
        completed: false,
        weight: Number(body.weight)
      })
      return ctx.body = { todo: result }
    } catch (err) {
      throw err
    }
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
    try {
      result = await model.findOneAndUpdate({ _id: body._id }, body).lean().exec()
      return ctx.body = result
    } catch (err) {
      throw err
    }
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
    try {
      result = await model.find().lean().exec()
      return ctx.body = { todos: result }
    } catch (err) {
      throw err
    }
  }
}