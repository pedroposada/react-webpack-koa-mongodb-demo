import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { default as FrontPageContainer } from 'containers/FrontPage'

type Props = {
};
export class FrontPageView extends React.Component {
  props: Props;

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={6}>
            <FrontPageContainer {...this.props} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default FrontPageView
