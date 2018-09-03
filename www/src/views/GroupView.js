import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { extractGroups } from '../redux/groups';
import Card from '../components/Card';

const Wrapper = styled.div`
  margin-top: 1em;
`

const GroupCardWrapper = styled.div`
  margin-bottom: 1em;
`

const GroupCard = ({ group }) => (
  <GroupCardWrapper>
    <Card>
      <Card.Title color={group.color}>
        <h2>{ group.name }</h2>
      </Card.Title>
      <Card.Content>
        <p>
        { group.description }
        </p>
      </Card.Content>
    </Card>
  </GroupCardWrapper>
)

const GroupView = ({ groups }) => (
  <Wrapper>
    <Grid>
      <Row>
      { groups.map(group => (
        <Col key={group.ref} xs={12} md={4}>
          <GroupCard group={group} />
        </Col>
      ))}
      </Row>
    </Grid>
  </Wrapper>
)

const mapStateToProps = state => ({
  groups: extractGroups(state)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GroupView);
