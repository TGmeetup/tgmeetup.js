import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-flexbox-grid';
import { GoGitCommit } from 'react-icons/go';
import { selectEvents } from '../../redux/selectors';
import { NonStyleLink } from '../../components';
import Card from '../../blocks/Card';
import { withFadeIn } from '../../components/FadeIn';

const View = ({ events, ...rests }) => (
  <Grid style={{ marginTop: '1em' }}>
    <Card>
      <Card.Title color="lightgreen">
        <h2>All Events</h2>
      </Card.Title>
      <Card.Content>
      { events.map(e => (
        <Card.Item key={e.id} onClick={() => {}}>
          <NonStyleLink to={`/events/${e.id}`}>
            <GoGitCommit />{' '}
            {e.moment.calendar()}{' '}
            <b className="event">{ e.name }</b>{' '}
            { e.location.trim() || e.local_city }
          </NonStyleLink>
        </Card.Item>
      ))}
      </Card.Content>
    </Card>
  </Grid>
)

const mapStateToProps = (state) => ({
  events: selectEvents(state.events.allIds, state),
})

export default withFadeIn(connect(mapStateToProps)(View));
