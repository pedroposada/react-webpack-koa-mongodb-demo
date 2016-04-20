import reducer, { initialState } from 'redux/modules/Accounts'

describe('(Redux) Accounts', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
