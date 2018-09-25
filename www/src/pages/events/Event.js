import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { compose } from 'recompose';
import styled from 'styled-components';
import { TiLocation, TiCalendar, TiTime } from 'react-icons/ti';

import { selectEvents } from '../../redux/selectors';
import Card from '../../components/Card';
import Map from '../../components/SingleMarkerMap';
import withFadeIn from '../../components/withFadeIn';

const GroupInformationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: gray;

  img {
    height: 100px;
    border-radius: 50%;
  }

  div {
    margin-left: 1em;
  }
`;

const GroupInformation = ({ group }) => (
  !!group &&
  <GroupInformationWrapper>
    <img src={group.logoURL}/>
    <div>
      <p>By {group.title}, {group.category.name}</p>
      <p>At {group.city}</p>
    </div>
  </GroupInformationWrapper>
)


const Event = ({ event }) => (
  !!event &&
  <Grid style={{ marginTop: '1em' }}>
    <Card>
      <Card.Title color={event.color}>
        <h2>{ event.name }</h2>
      </Card.Title>
      <Card.Content>
        <Card.Block style={{
          color: 'lightgray',
          background: event.color,
          filter: 'brightness(150%)',
          }}
        >
          <p>
            <TiCalendar />
            {' '}
            {event.moment.format('HH:mm')}
            {' '}
            {event.moment.format('MM/DD/YYYY')}
            {' '}
            {`(${event.moment.format('dddd')})`}
          </p>
          <p>
            <TiLocation />
            {' '}
            {event.location}
          </p>
        </Card.Block>
        <Card.Block>
          <GroupInformation group={event.group} />
        </Card.Block>
        <Card.Block fluid style={{ height: '600px' }}>
          <Map geocode={event.geocode}/>
        </Card.Block>
      </Card.Content>
    </Card>
  </Grid>
)

const mapStateToProps = (state, { match }) => {
  const eventId = match.params.id;

  return {
    event: selectEvents([ eventId ], state)[0],
  }
}

export default compose(
  withFadeIn,
  withRouter,
  connect(mapStateToProps)
)(Event);
