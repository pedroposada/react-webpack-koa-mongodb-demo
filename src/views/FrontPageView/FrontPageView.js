import React from 'react'
import Todolist from 'containers/Todolist'
import { PageHeader, Grid, Row, Col } from 'react-bootstrap'

type Props = {

};
export class FrontPage extends React.Component {
  props: Props;

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={6}>
            <PageHeader>Todos Demo</PageHeader>
            <Todolist />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default FrontPage
