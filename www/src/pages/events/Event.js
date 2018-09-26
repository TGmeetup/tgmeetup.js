import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Grid } from 'react-flexbox-grid';
import { TiLocation, TiCalendar } from 'react-icons/ti';

import { selectEvents } from '../../redux/selectors';

import Card from '../../blocks/Card';
import { PlainMap as Map } from '../../components/Map';
import { withFadeIn } from '../../components/FadeIn';
import { Information as GroupInfo } from '../groups/Group';


const Event = ({ event, history }) => (
  !!event &&
  <Grid>
    <Card>
      <Card.Title color={event.color}>
        <h2>{ event.name }</h2>
      </Card.Title>
      <Card.Content>
        <Card.Block __bright color={event.color}>
          <p>
            <TiCalendar />
            {' '}
            {event.moment.format('HH:mm')}
            {' '}
            {event.moment.format('MM/DD/YYYY')}
            {' '}
            ({event.moment.format('dddd')})
          </p>
          <p>
              <TiLocation />
              {' '}
              <a href={`https://www.google.com/maps/?q=${encodeURI(event.location)}`} target="_blank">
                {event.location}
              </a>
          </p>
        </Card.Block>
        <Card.Block onClick={() => history.push(`/groups/${event.group.id}`)}>
          <GroupInfo group={event.group} />
        </Card.Block>
        <Card.Block __fluid __size_fixed_md>
          <Map zoomToStreet
            markers={[ event.marker ]}
            center={event.geocode}
          />
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
