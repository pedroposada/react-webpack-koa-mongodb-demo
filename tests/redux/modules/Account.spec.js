import reducer, { initialState } from 'redux/modules/Account'

describe('(Redux) Account', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState)
    })
  })
})
