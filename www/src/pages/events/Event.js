import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from 'react-flexbox-grid';
import { compose } from 'recompose';
import { TiLocation, TiCalendar } from 'react-icons/ti';

import { selectEvents } from '../../redux/selectors';
import Card from '../../components/Card';
import Map from '../../components/SimpleMarkerMap';
import { withFadeIn } from '../../components/FadeIn';
import { Information as GroupInfo } from '../groups/Group';

const Event = ({ event, history }) => (
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
        <Card.Block onClick={() => history.push(`/groups/${event.group.id}`)}>
          <GroupInfo group={event.group} />
        </Card.Block>
        <Card.Block fluid style={{ height: '600px' }}>
          <Map geocodes={[event.geocode]}/>
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
