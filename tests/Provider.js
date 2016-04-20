import React from 'react'

const Provider = React.createClass ({
  getChildContext () {
    return {
      store: this.props.store
    }
  },
  render () {
    return this.props.children
  }
})
Provider.childContextTypes = {
  store: React.PropTypes.object
}

export default Provider
