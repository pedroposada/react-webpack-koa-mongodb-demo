import React from 'react'
import { mount, render, shallow } from 'enzyme'
import MockStore from '../MockStore'
import Provider from '../Provider'
import { LoginPage } from 'containers/LoginPage'

const shallowRender = (component) => {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

describe('(Container) LoginPage', () => {
  it('renders a <form />', () => {
    const wrapper = mount(<Provider store={MockStore}><LoginPage /></Provider>)
    expect(wrapper.find('form')).to.have.length(1)
  })
})
