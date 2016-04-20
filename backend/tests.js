import request from 'co-supertest'
import { assert } from 'chai'
import { default as koajwt } from 'koa-jwt'
import app, { JWT_SECRET, JWT_TTL } from './index'

/**
 * Login route
 */
describe('Login - POST /api/login', () => {
  it('Should respond with error 400 - Invalid credentials.', (done) => {
    request(app.listen())
    .post('/api/login')
    .expect('Content-Type', /json/)
    .expect({
      status: 400,
      message: 'Invalid credentials.'
    })
    .end(done)
  })

  it('Should respond with status 200 and valid jwt token', (done) => {
    request(app.listen())
    .post('/api/login')
    .send({
      username: 'test',
      password: 'test',
    })
    .expect('Content-Type', /json/)
    .expect((res) => {
      // if no token in response body
      if (!('token' in res.body)) {
        throw new Error('missing token')
      }
      // throws error if verify fails; JsonWebTokenError: invalid signature
      const decoded = koajwt.verify(res.body.token, JWT_SECRET)
    })
    .end(done)
  })
})

/**
 * Add new todo route
 */
describe('Add new todo - POST /api/todos', () => {
  it('Should respond with error 400 - Unauthorized', (done) => {
    request(app.listen())
    .post('/api/todos')
    .expect('Content-Type', /json/)
    .expect({
      status: 401,
      message: 'No Authorization header found\n'
    })
    .end(done)
  })

  it('Should respond with status 200 and todos object', (done) => {
    // simulate token
    const token = koajwt.sign({}, JWT_SECRET, { expiresIn: JWT_TTL })
    request(app.listen())
    .post('/api/todos')
    .set('Authorization', `Bearer ${token}`)
    .send({
      text: 'unit test call',
      completed: false,
      weight: 0
    })
    .expect('Content-Type', /json/)
    .expect((res) => {
      assert(res.body.text === 'unit test call', '"text" should be "unit test call"')
      assert(res.body.completed === false, '"completed" should be false')
      assert(res.body.weight === 0, '"weight" should be 0')
      assert.property(res.body, '_id', 'Should have property "_id"')
    })
    .end(done)
  })
})

/**
 * Update existing todo route
 */
describe('Update existing todo - PUT /api/todos', () => {
  it('Should respond with error 400 - Unauthorized', (done) => {
    request(app.listen())
    .put('/api/todos')
    .expect('Content-Type', /json/)
    .expect({
      status: 401,
      message: 'No Authorization header found\n'
    })
    .end(done)
  })

  /**
   * example of nested requests
   */
  it('Should respond with status 200 and todos object', (done) => {
    // store request client in agent variable
    // to re-use it later on
    const agent = request(app.listen())

    // simulate token
    const token = koajwt.sign({}, JWT_SECRET, { expiresIn: JWT_TTL })
    agent
    .get('/api/todos')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .expect((res) => {
      assert(Array.isArray(res.body), 'Response should be array of todos')
    })
    .end((err, res) => {
      const testtext = 'updated todo in unit test'
      const { text, ...other } = res.body[0]
      const send = Object.assign({}, {...other}, {text: testtext})
      /**
       * start nested request
       */
      agent
      .put('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send(send)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        assert(res.body.text === testtext, `"text" should be "${testtext}"`)
        assert.property(res.body, '_id', 'Should have property "_id"')
      })
      .end(done)
    })
  })
})
