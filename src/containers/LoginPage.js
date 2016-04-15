import React from 'react'
import { connect } from 'react-redux'
import LoginForm from 'forms/LoginForm'

type Props = {

};
export class LoginPage extends React.Component {
  props: Props;

  render () {
    return (
      <div><LoginForm {...this.props} /></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
