import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import dateformat from 'dateformat'
import mongoose from 'mongoose'
import { default as koajwt } from 'koa-jwt'
import convert from 'koa-convert'
import routes from './routes'

export const JWT_SECRET = 'my secret'
export const JWT_TTL = 60*60*5 // time in seconds

/**
  * Error handling - function to display stack trace and line numbers in terminal
*/
const dumpError = (err) => {
  if (typeof err === 'object') {
    if (err.message) {
      console.log('\nMessage: ' + err.message)
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack)
    }
  } else {
    console.log('dumpError :: argument is not an object')
  }
}

/**
 * init App
 */
// const app = koa()
const app = new Koa()

/**
 * error handling
 */
app.use(async (ctx, next) => {
  const start = new Date
  try {
    await next()
    const ms = new Date - start
    if (process.env === 'development') console.log(`[${dateformat(start, 'isoDateTime')}] ${ctx.method} ${ctx.url} - ${ms}ms`)
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      message: err.message,
      status: err.status
    }
    if (process.env === 'development') dumpError(err)
  }
})

/**
 * CORS support
 */
app.use(convert(cors({
  origin: '*',
  headers: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Access-Control-Allow-Origin'],
  methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE']
})))

/**
 * parse request body into js object
 */
app.use(convert(bodyParser()))

/**
 * connect db
 */
mongoose.connect('127.0.0.1:27017/todosdemo')

/**
 * JWT authentication control
 * all paths protected by default
 */
app.use(convert(koajwt({ secret: JWT_SECRET }).unless({ path: [
  // add unprotected paths here
  // /regex for path/, ...

  /^\/api\/login/,
  /^\/favicon.ico/,
]})))

/**
 * REST routes
 * from routes/index.js
 */
const router = new Router()
routes(router)
app
  .use(router.routes())
  .use(router.allowedMethods());

/**
 * export app with middleware
 * usefull for unit testing and nested apps
 */
export default app

/**
 * Start server
 */
const port = process.env.PORT || 5000
app.listen(port, (err) => {
  if (err) throw err;
  // feedback to console
  if (process.env === 'development') console.log(`Listening on port [${port}]`)
})
