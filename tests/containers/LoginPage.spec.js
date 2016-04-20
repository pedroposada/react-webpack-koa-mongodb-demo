import React from 'react'
import { Provider } from 'react-redux'
import { mount, render, shallow } from 'enzyme'
// import { mockStore } from 'tests/mockStore'
import { LoginPage } from 'containers/LoginPage'

const mountWithProps = (props = {}, ctx = {}) => {
  return mount(<LoginPage {...props} />, { context: ctx })
}

describe('(Container) LoginPage', () => {
  it('renders a <form />', () => {
    let wrapper = shallow(<LoginPage />)
    expect(wrapper.find('form')).to.have.length(1)
  })
})
